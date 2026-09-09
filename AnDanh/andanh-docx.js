  function maskFor(f, style){
    const n = Math.max(2, Math.min(f.text.length, 28));
    if (style==="stars") return "*".repeat(n);
    if (style==="hidden") return "[DA AN]";
    if (style==="label") return "["+(CATEGORY_META[f.category].short.toUpperCase())+"]";
    return "\u2588".repeat(n);
  }
  function applyRedactions(text, findings, style){
    const sorted = findings.slice().sort(function(a,b){ return a.start-b.start; });
    let out="", cursor=0;
    sorted.forEach(function(f){ if (f.start<cursor || f.start>text.length) return; out += text.slice(cursor,f.start)+maskFor(f,style); cursor=Math.min(f.end,text.length); });
    return out + text.slice(cursor);
  }
  function escapeHtml(s){
    return s.replace(/&/g,"\u0026amp;").replace(/</g,"\u0026lt;").replace(/>/g,"\u0026gt;").replace(/"/g,"\u0026quot;");
  }
  function highlightHtml(text, findings, mode, style){
    if (!findings.length) return escapeHtml(text);
    const sorted = findings.slice().sort(function(a,b){ return a.start-b.start; });
    let out="", cursor=0;
    sorted.forEach(function(f){
      if (f.start<cursor) return;
      out += escapeHtml(text.slice(cursor,f.start));
      const inner = mode==="redacted" ? maskFor(f,style) : f.text;
      out += '<mark data-cat="'+f.category+'">'+escapeHtml(inner)+"</mark>";
      cursor = f.end;
    });
    return out + escapeHtml(text.slice(cursor);
  }
  function decodeXml(s){
    return s.replace(/\u0026lt;/g,"<").replace(/\u0026gt;/g,">").replace(/\u0026quot;/g,'"').replace(/\u0026apos;/g,"'").replace(/&#39;/g,"'").replace(/\u0026amp;/g,"\u0026");
  }
  function encodeXml(s){
    return s.replace(/&/g,"\u0026amp;").replace(/</g,"\u0026lt;").replace(/>/g,"\u0026gt;").replace(/"/g,"\u0026quot;");
  }
  function paragraphText(pXml){ let t="", re=/<w:t\b[^>]*>([^<]*)<\/w:t>/g, m; while ((m=re.exec(pXml))) t += decodeXml(m[1]); return t; }
  function extractParagraphs(xml){
    const paragraphs=[]; const re=/<w:p\b[\s\S]*?<\/w:p>/g; let m, offset=0, index=0;
    while ((m=re.exec(xml))) {
      const text=paragraphText(m[0]);
      if (index>0) offset += 1;
      const start=offset, end=start+text.length;
      paragraphs.push({index,text,start,end});
      offset=end; index += 1;
    }
    return { xml, paragraphs, text: paragraphs.map(function(p){return p.text;}).join("\n") };
  }
  const PART_RE = /^word\/(document|header\d*|footer\d*|footnotes|endnotes|comments)\.xml$/;
  async function readDocx(buffer){
    const zip = await JSZip.loadAsync(buffer);
    const names = Object.keys(zip.files).filter(function(n){ return PART_RE.test(n) && !zip.files[n].dir; });
    names.sort(function(a,b){ if (a.indexOf("document.xml")>=0) return -1; if (b.indexOf("document.xml")>=0) return 1; return a.localeCompare(b); });
    const parts=[];
    for (const name of names) {
      const xml = await zip.files[name].async("string");
      const extracted = extractParagraphs(xml);
      parts.push({ name, xml, text: extracted.text, paragraphs: extracted.paragraphs });
    }
    const body = parts.find(function(p){ return p.name.endsWith("document.xml"); });
    const extras = parts.filter(function(p){ return p!==body; });
    const text = [body && body.text || ""].concat(extras.map(function(p){return p.text;})).filter(Boolean).join("\n");
    return { zip, parts, text };
  }
  function redactParagraphXml(pXml, paraText, local, style){
    if (!local.length) return pXml;
    const next = applyRedactions(paraText, local, style);
    let i=0;
    return pXml.replace(/(<w:t\b[^>]*>)([^<]*)(<\/w:t>)/g, function(full, open, _t, close){
      if (i===0) { i++; const preserved=/xml:space\s*=/.test(open)?open:open.replace(/>$/,' xml:space="preserve">'); return preserved+encodeXml(next)+close; }
      i++; return open+close;
    });
  }
  function redactPartXml(part, findings, style){
    const mine = findings.filter(function(f){ return f.part===part.name; }).sort(function(a,b){ return a.start-b.start; });
    if (!mine.length) return part.xml;
    let paraIndex=0;
    return part.xml.replace(/<w:p\b[\s\S]*?<\/w:p>/g, function(pXml){
      const para = part.paragraphs[paraIndex++];
      if (!para || !para.text) return pXml;
      const local = mine.filter(function(f){ return f.start<para.end && f.end>para.start; }).map(function(f){
        return Object.assign({}, f, { start: Math.max(0,f.start-para.start), end: Math.min(para.text.length, f.end-para.start) });
      }).filter(function(f){ return f.end>f.start; });
      return redactParagraphXml(pXml, para.text, local, style);
    });
  }
  async function redactDocx(zip, parts, findings, style){
    for (const part of parts) zip.file(part.name, redactPartXml(part, findings, style));
    return zip.generateAsync({ type:"blob", mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document", compression:"DEFLATE" });
  }
  function paragraphXml(text){
    if (!text) return "<w:p></w:p>";
    return '<w:p><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="Times New Roman"/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr><w:t xml:space="preserve">'+encodeXml(text)+"</w:t></w:r></w:p>";
  }
  async function buildDocxFromText(text){
    const zip = new JSZip();
    const paras = text.split(/\n/).map(paragraphXml).join("");
    zip.file("[Content_Types].xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>');
    zip.file("_rels/.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>');
    zip.file("word/_rels/document.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>');
    zip.file("word/document.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>'+paras+'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="708" w:footer="708"/></w:sectPr></w:body></w:document>');
    return zip.generateAsync({ type:"blob", mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document", compression:"DEFLATE" });
  }
  function downloadBlob(blob, filename){
    const url = URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=filename;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){ URL.revokeObjectURL(url); }, 1500);
  }
  function parseCustomTerms(raw){
    return raw.split(/\n|,/).map(function(s){return s.trim();}).filter(function(s,i,arr){ return s.length>=2 && arr.indexOf(s)===i; }).sort(function(a,b){ return b.length-a.length; });
  }
