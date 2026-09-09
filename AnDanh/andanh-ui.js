  let doc=null, style="block", previewMode="source", disabledIds=new Set(), disabledCats=new Set();

  const $ = function(id){ return document.getElementById(id); };
  function setErr(msg){ const el=$("idleErr"); if (!msg){ el.hidden=true; el.textContent=""; return;} el.hidden=false; el.textContent=msg; }

  function findingsOf(){
    if (!doc) return [];
    const terms = parseCustomTerms($("custom").value);
    if (doc.parts && doc.parts.length) {
      return doc.parts.reduce(function(acc,p){ return acc.concat(detectPii(p.text, p.name, terms)); }, []);
    }
    return detectPii(doc.text, doc.bodyPart, terms);
  }
  function activeFindings(all){
    return all.filter(function(f){ return !disabledIds.has(f.id) && !disabledCats.has(f.category); });
  }

  function render(){
    if (!doc){ $("idle").hidden=false; $("work").hidden=true; return; }
    $("idle").hidden=true; $("work").hidden=false;
    $("fileName").textContent = doc.fileName;
    const all = findingsOf();
    const active = activeFindings(all);
    $("countLine").textContent = active.length + " / " + all.length + " cho duoc che";
    $("styles").innerHTML = REDACT_STYLES.map(function(s){
      return '<button type="button" class="btn btn-ghost'+(style===s.id?' on':'')+'" data-style="'+s.id+'">'+s.label+' '+s.sample+'</button>';
    }).join("");
    const counts={};
    all.forEach(function(f){ counts[f.category]=(counts[f.category]||0)+1; });
    $("cats").innerHTML = CATEGORY_ORDER.filter(function(c){ return counts[c]; }).map(function(c){
      const on = !disabledCats.has(c);
      return '<button type="button" class="chip'+(on?' on':'')+'" data-cat="'+c+'">'+CATEGORY_META[c].short+' '+counts[c]+'</button>';
    }).join("");
    const groups={};
    all.forEach(function(f){ (groups[f.category]=groups[f.category]||[]).push(f); });
    $("findList").innerHTML = CATEGORY_ORDER.filter(function(c){ return groups[c]; }).map(function(c){
      const items = groups[c].map(function(f){
        return '<label><input type="checkbox" data-id="'+f.id+'" '+(disabledIds.has(f.id)?"":"checked")+' /><span>'+escapeHtml(f.text)+'</span></label>';
      }).join("");
      return '<div style="margin-top:8px"><strong>'+CATEGORY_META[c].label+'</strong>'+items+'</div>';
    }).join("");
    const bodyF = active.filter(function(f){ return !doc.parts || f.part===doc.bodyPart; });
    $("preview").innerHTML = highlightHtml(doc.text, bodyF, previewMode, style);
    $("modeSrc").classList.toggle("on", previewMode==="source");
    $("modeRed").classList.toggle("on", previewMode==="redacted");
  }

  function loadText(name, text){
    doc = { kind:"text", fileName:name, originalBuffer:null, parts:null, text:text, bodyPart:"body" };
    disabledIds = new Set(); previewMode="source"; setErr(""); render();
  }
  async function loadFile(file){
    const name = file.name || "van-ban.docx";
    const lower = name.toLowerCase();
    try {
      if (lower.endsWith(".txt") || lower.endsWith(".text") || file.type==="text/plain") {
        loadText(name, await file.text()); return;
      }
      if (!lower.endsWith(".docx")) { setErr("Chi ho tro tep .docx hoac .txt."); return; }
      const buffer = await file.arrayBuffer();
      const read = await readDocx(buffer);
      const body = read.parts.find(function(p){ return p.name.endsWith("document.xml"); });
      if (!body || !(body.text||read.text).trim()) { setErr("Khong doc duoc noi dung trong tep .docx."); return; }
      doc = { kind:"docx", fileName:name, originalBuffer:buffer, parts:read.parts, text: body.text || read.text, bodyPart: body.name, zipReady:true };
      disabledIds = new Set(); previewMode="source"; setErr(""); render();
    } catch (e) { setErr("Tep khong hop le hoac da hong."); }
  }

  $("btnBrowse").onclick = function(){ $("file").click(); };
  $("btnReplace").onclick = function(){ $("file").click(); };
  $("file").onchange = function(e){ const f=e.target.files&&e.target.files[0]; if (f) loadFile(f); };
  $("btnSample").onclick = function(){ loadText("Mau_an_danh_VKSND_Can_Tho.txt", SAMPLE); };
  $("btnPaste").onclick = function(){ $("pasteBox").hidden = !$("pasteBox").hidden; };
  $("btnPasteGo").onclick = function(){ const v=$("pasteVal").value.trim(); if (!v) { setErr("Hay dan noi dung truoc."); return; } loadText("van-ban-dan.txt", v); };
  $("btnClear").onclick = function(){ doc=null; $("file").value=""; render(); };
  $("btnHelp").onclick = function(){ $("help").hidden=false; $("help").style.display="flex"; };
  $("helpClose").onclick = function(){ $("help").hidden=true; $("help").style.display="none"; };
  $("custom").oninput = function(){ if (doc) render(); };
  $("modeSrc").onclick = function(){ previewMode="source"; render(); };
  $("modeRed").onclick = function(){ previewMode="redacted"; render(); };
  $("styles").addEventListener("click", function(e){ const b=e.target.closest("[data-style]"); if (!b) return; style=b.getAttribute("data-style"); render(); });
  $("cats").addEventListener("click", function(e){
    const b=e.target.closest("[data-cat]"); if (!b) return;
    const c=b.getAttribute("data-cat");
    if (disabledCats.has(c)) disabledCats.delete(c); else disabledCats.add(c);
    render();
  });
  $("findList").addEventListener("change", function(e){
    const id=e.target.getAttribute("data-id"); if (!id) return;
    if (e.target.checked) disabledIds.delete(id); else disabledIds.add(id);
    render();
  });
  const drop=$("drop");
  drop.addEventListener("dragover", function(e){ e.preventDefault(); drop.classList.add("over"); });
  drop.addEventListener("dragleave", function(){ drop.classList.remove("over"); });
  drop.addEventListener("drop", function(e){ e.preventDefault(); drop.classList.remove("over"); const f=e.dataTransfer.files[0]; if (f) loadFile(f); });

  $("btnCopy").onclick = async function(){
    if (!doc) return;
    const text = applyRedactions(doc.text, activeFindings(findingsOf()).filter(function(f){ return !doc.parts || f.part===doc.bodyPart; }), style);
    try { await navigator.clipboard.writeText(text); alert("Da sao chep van ban da an."); } catch(e){ alert("Khong sao chep duoc. Hay tai tep."); }
  };
  $("btnDl").onclick = async function(){
    if (!doc) return;
    const active = activeFindings(findingsOf());
    let blob;
    if (doc.kind==="docx" && doc.originalBuffer) {
      const fresh = await readDocx(doc.originalBuffer);
      blob = await redactDocx(fresh.zip, fresh.parts, active, style);
    } else {
      blob = await buildDocxFromText(applyRedactions(doc.text, active, style));
    }
    const base = (doc.fileName||"van-ban").replace(/\.[^.]+$/,"") || "van-ban";
    downloadBlob(blob, "AnDanh_"+base+".docx");
  };
