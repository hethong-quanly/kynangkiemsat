# Glossary rule engine used to normalise EN legal terms in i18n packs (see i18n/GLOSSARY.md).
# Usage: from apply_glossary import apply; apply(vi, en) -> en
# -*- coding: utf-8 -*-
"""Glossary rules: (id, vi_cond, vi_neg, [(en_bad_regex, replacement)], en_expected)
vi_cond / vi_neg are case-insensitive regexes on the Vietnamese source; None = always.
en_bad regexes are case-insensitive; the replacement keeps the case style of the match."""
import re
VKS=r"(?:Viện kiểm sát|VKS)"
R=[
 # ---- laws & codes ----
 ("law-denunciations", r"Luật Tố cáo|Luật TC\b", None, [
   (r"\b(?:the )?Denunciations? Law\b", "Law on Denunciations"),
   (r"\bLaw on (?:the )?(?:Denunciation|Accusations?|Denouncing|Denouncement)\b(?!s)", "Law on Denunciations")], r"Law on Denunciations"),
 ("law-complaints", r"Luật Khiếu nại|Luật KN\b", None, [
   (r"\b(?:the )?Complaints? Law\b", "Law on Complaints"),
   (r"\bLaw on (?:the )?(?:Complaint|Complaining)\b(?!s)", "Law on Complaints")], r"Law on Complaints"),
 ("law-adm-proc", r"Luật Tố tụng hành chính|Luật TTHC", None, [
   (r"\b(?:the )?Administrative Procedures? (?:Law|Code)\b", "Law on Administrative Procedures"),
   (r"\b(?:the )?Code of Administrative Procedures?\b", "Law on Administrative Procedures"),
   (r"\bLaw on (?:the )?Administrative (?:Procedure|Proceedings?)\b(?!s)", "Law on Administrative Procedures")], r"Law on Administrative Procedures"),
 ("law-thads", r"Luật Thi hành án dân sự|Luật THADS", None, [
   (r"\b(?:the )?Civil Judgments? (?:Enforcement|Execution) Law\b", "Law on Enforcement of Civil Judgments"),
   (r"\bLaw on (?:the )?(?:Civil Judgments? (?:Enforcement|Execution)|Execution of Civil Judgments?|Enforcement of Civil Judgment(?!s)|Civil (?:Enforcement|Execution))\b", "Law on Enforcement of Civil Judgments")], r"Law on Enforcement of Civil Judgments"),
 ("law-thahs", r"Luật Thi hành án hình sự|Luật THAHS", None, [
   (r"\b(?:the )?Criminal Judgments? (?:Enforcement|Execution) Law\b", "Law on Execution of Criminal Judgments"),
   (r"\bLaw on (?:the )?(?:Criminal Judgments? (?:Enforcement|Execution)|Enforcement of Criminal Judgments?|Execution of Criminal Judgment(?!s)|Criminal (?:Enforcement|Execution))\b", "Law on Execution of Criminal Judgments")], r"Law on Execution of Criminal Judgments"),
 ("law-org-vks", r"Luật Tổ chức (?:Viện kiểm sát|VKSND)", None, [
   (r"\bLaw on (?:the )?(?:Organi[sz]ation|Organizing|Organising) of (?:the )?People'?s'? Procurac(?:y|ies)\b", "Law on Organization of People's Procuracies"),
   (r"\b(?:the )?(?:Law on )?People'?s Procurac(?:y|ies) Organi[sz]ation Law\b", "Law on Organization of People's Procuracies"),
   (r"\bLaw on (?:the )?Organi[sz]ation of (?:the )?Procurac(?:y|ies)\b", "Law on Organization of People's Procuracies")], r"Law on Organization of People's Procuracies"),
 ("law-org-court", r"Luật Tổ chức (?:Tòa án|Toà án|TAND)", None, [
   (r"\bLaw on (?:the )?(?:Organi[sz]ation|Organizing|Organising) of (?:the )?People'?s'? Courts?\b", "Law on Organization of People's Courts")], r"Law on Organization of People's Courts"),
 ("law-custody", r"Luật Thi hành tạm giữ", None, [
   (r"\bLaw on (?:the )?(?:Execution|Enforcement|Implementation) of (?:Temporary )?(?:Detention|Custody),? (?:and |& )?(?:Temporary )?(?:Detention|Custody)\b", "Law on Enforcement of Custody and Temporary Detention"),
   (r"\bLaw on (?:Temporary )?(?:Detention|Custody) (?:and |& )?(?:Temporary )?(?:Detention|Custody) (?:Enforcement|Execution)\b", "Law on Enforcement of Custody and Temporary Detention")], r"Law on Enforcement of Custody and Temporary Detention"),
 ("code-civ-proc", r"Bộ luật Tố tụng dân sự|BLTTDS", None, [
   (r"\bCode of Civil Procedure\b", "Civil Procedure Code"),
   (r"\bCivil (?:Procedural|Proceedings?) Code\b", "Civil Procedure Code")], r"Civil Procedure Code"),
 ("code-crim-proc", r"Bộ luật Tố tụng hình sự|BLTTHS", None, [
   (r"\bCode of Criminal Procedure\b", "Criminal Procedure Code"),
   (r"\bCriminal (?:Procedural|Proceedings?) Code\b", "Criminal Procedure Code")], r"Criminal Procedure Code"),
 ("code-crim", r"Bộ luật Hình sự|BLHS", None, [(r"\bPenal Code\b", "Criminal Code")], r"Criminal Code"),
 # ---- bodies & titles ----
 ("council-judges", r"Hội đồng Thẩm phán|HĐTP", None, [
   (r"\b(?:the )?Judges'? Council\b", "Council of Judges"),
   (r"\b(?:Judicial|Justices'?) Council\b", "Council of Judges"),
   (r"\bBoard of Judges\b", "Council of Judges"),
   (r"\bCouncil of Judge\b(?!s)", "Council of Judges")], r"Council of Judges"),
 ("prosecutor-general", None, None, [
   (r"\bProcurator[- ]General\b", "Prosecutor General"),
   (r"\b(?:Chairman|President|Director(?: General)?|Head|Chief Procurator)( of the Supreme People's Procuracy)\b", r"Prosecutor General\1")], None),
 ("vt-vkstc", r"(?<!Phó )Viện trưởng (?:Viện kiểm sát nhân dân tối cao|VKSND tối cao|VKSNDTC|VKSTC)", r"Phó Viện trưởng", [
   (r"\b(?:Director(?: General)?|Chairman|President|Chief Procurator)\b(?! of the)", "Prosecutor General")], r"Prosecutor General"),
 ("pvt-vkstc", r"Phó Viện trưởng (?:Viện kiểm sát nhân dân tối cao|VKSND tối cao|VKSNDTC|VKSTC)", None, [
   (r"\b(?:Deputy|Vice)[- ](?:Director(?: General)?|Chairman|President|Chief Procurator|Head)\b", "Deputy Prosecutor General")], r"Deputy Prosecutor General"),
 ("pvt", r"Phó Viện trưởng", r"Phó (?:Vụ|Cục) trưởng|Phó Giám đốc|Phó Chánh|Phó Trưởng|Viện Khoa học|Viện KH|Học viện|Phó Viện trưởng (?:Viện kiểm sát nhân dân tối cao|VKSND tối cao|VKSNDTC|VKSTC)", [
   (r"\b(?:Deputy|Vice)[- ](?:Director(?: General)?|Chairman|President|Head|Chief)\b(?! Procurator| Justice| Judge)", "Deputy Chief Procurator")], r"Deputy Chief Procurator"),
 ("vt", r"(?<!Phó )Viện trưởng", r"Vụ trưởng|Cục trưởng|Giám đốc(?! thẩm)|Chánh|Trưởng phòng|Viện Khoa học|Viện KH|Học viện|Viện trưởng (?:Viện kiểm sát nhân dân tối cao|VKSND tối cao|VKSNDTC|VKSTC)", [
   (r"(?<!Deputy )(?<!Vice )\b(?:Director(?: General)?|Chairman|Head of (?:the )?Procuracy)\b", "Chief Procurator")], r"Chief Procurator"),
 ("investigating-agency", r"Cơ quan điều tra|CQĐT|cơ quan CSĐT|Cơ quan Cảnh sát điều tra|Cơ quan An ninh điều tra", None, [
   (r"\binvestigati(?:on|ve|ng) (agenc|authorit|bod)(y|ies)\b", None)], r"investigating agenc"),
 ("council-trial", r"Hội đồng xét xử|HĐXX", None, [
   (r"\b(?:trial|judging|adjudication|hearing|adjudicating) council(s)?\b", r"trial panel\1"),
   (r"\bcouncil of (?:trial|adjudication)\b", "trial panel")], r"trial panel"),
 ("court-clerk", r"Thư ký (?:Tòa|Toà|phiên tòa|phiên toà)", None, [(r"\bcourt secretar(y|ies)\b", None)], r"court clerk"),
 ("assessor", r"Hội thẩm", None, [(r"\bjurors?\b|\bjury\b", "people's assessor")], r"assessor"),
 ("supreme-court", r"Tòa án nhân dân tối cao|Toà án nhân dân tối cao|TAND tối cao|TANDTC", None, [(r"\b(?:the )?Supreme Court\b(?! of)", "the Supreme People's Court")], r"Supreme People's Court"),
 ("cantho", r"Cần Thơ", None, [
   (r"\bCan Tho City People'?s Procuracy\b", "People's Procuracy of Can Tho City"),
   (r"\bCan Tho People'?s Procuracy\b", "People's Procuracy of Can Tho City"),
   (r"\bPeople's Procuracy of Can Tho city\b", "People's Procuracy of Can Tho City"),
   (r"\bCan Tho City People'?s Court\b", "People's Court of Can Tho City")], None),
 ("regional-vks", r"(?:VKSND|Viện kiểm sát nhân dân|VKS) khu vực", None, [
   (r"\b(?:area|local|zonal) People's Procurac(y|ies)\b", r"regional People's Procurac\1"),
   (r"\bPeople's Procurac(y|ies) of (?:the )?(?:area|region|zone)s?\b", r"regional People's Procurac\1")], r"[Rr]egional People's Procurac"),
 ("complaint-not-protest", r"khiếu nại|tố cáo|(?<![A-Za-zÀ-ỹĐđ])(?:TC|KN-TC|KNTC)(?![A-Za-zÀ-ỹĐđ])|người (?:bị )?KN|KN lần|KN (?:ĐTV|KSV|tạm giam|tạm giữ|TTHS|hành chính)|đơn KN", r"kháng nghị", [
   (r"\bprotesters?\b", "__COMPLAINANT__"), (r"\bprotestees?\b", "person complained against"),
   (r"\bprotests? against\b", "__CAGAINST__"), (r"\bprotest(s|ed|ing)?\b", "__COMPLAINT__"),
   (r"\b(?:Appeals?|Complaints?) Law\b", "Law on Complaints"), (r"\bLaw on Appeals?\b", "Law on Complaints")], None),
 ("complaint-not-appeal", r"KN TTHS|KN hành chính|khiếu nại", r"kháng cáo|phúc thẩm|kháng nghị", [
   (r"\bcriminal proceedings? appeals?\b", "criminal procedure complaint"), (r"\badministrative appeals?\b", "administrative complaint"),
   (r"\bappeals? against\b", "complaints against")], None),
 ("custody-detention-pair", r"tạm giữ\s*[/,]\s*tạm giam|tạm giữ và tạm giam|tạm giữ, tạm giam", None, [
   (r"\b(?:temporary )?detention(\s*[/,]\s*|\s+and\s+)temporary detention\b", r"custody\1temporary detention"),
   (r"\btemporary detention(\s*[/,]\s*|\s+and\s+)custody\b", r"custody\1temporary detention"),
   (r"\bcapture\b", "arrest")], None),
 ("institute", r"Viện kiểm sát|VKS|lãnh đạo Viện|của Viện|Viện ra|Viện c(?:ấp|ùng)", r"Viện Khoa học|Viện KH|Học viện|Viện Nghiên cứu|viện nghiên cứu", [(r"\bInstitutes?\b(?! of)", "Procuracy")], None),
 # ---- procedure ----
 ("reopening", r"tái thẩm", None, [
   (r"\bre-?trials?\b", "reopening"), (r"\bre-?trial procedures?\b", "reopening procedure"),
   (r"\bre-?(?:examination|hearing)s?\b", "reopening")], r"reopening"),
 ("cassation", r"giám đốc thẩm|GĐT", None, [
   (r"\bsupervisory (?:review|trial|procedure)s?\b", "cassation"),
   (r"\b(?:supervisory|cassation) trial panel\b", "cassation panel")], r"cassation"),
 ("protest", r"kháng nghị", r"kháng cáo|phúc thẩm|đề nghị kháng|khiếu nại|bị kháng cáo", [
   (r"\bnon-appeals?\b", "non-protest"),
   (r"\bappeal(ed|ing|s)?\b", "__PROTEST__")], r"[Pp]rotest"),
 ("protest-decision", r"kháng nghị", r"kháng cáo", [
   (r"\b(?:decision|decisions) (?:to|on) appeal\b", "decision to protest"),
   (r"\bappeal decisions?\b(?! of| on)", "protest decision"),
   (r"\bnon-appeals?\b", "non-protest")], None),
 ("recommendation-prosecution", r"kiến nghị khởi tố", None, [
   (r"\b(?:petitions?|proposals?|requests?|recommendations?) (?:for|on) (?:criminal )?(?:prosecution|institution of criminal proceedings)\b", "recommendations for prosecution"),
   (r"\bprosecution (?:petitions?|proposals?|recommendations?)\b", "recommendations for prosecution")], r"recommendations? for prosecution"),
 ("recommendation", r"kiến nghị", r"đơn|thỉnh cầu|đề nghị|đề xuất|yêu cầu|phản ánh|kiến nghị khởi tố", [
   (r"\bpetition(s|ed|ing)?\b", "__RECO__"), (r"\bproposal(s)?(?= for remed)", r"recommendation\1")], r"[Rr]ecommend"),
 ("crime-reports", r"tố giác,? tin báo", None, [
   (r"\b(?:crime )?denunciations?,? (?:and )?(?:crime )?(?:information|news|notifications?|reports?) (?:on|of|about) crimes?\b", "denunciations and crime reports"),
   (r"\bdenunciations? and information (?:on|about|of) crimes?\b", "denunciations and crime reports"),
   (r"\bcrime denunciations? and (?:crime )?reports?\b", "denunciations and crime reports")], None),
 ("crime-sources", r"nguồn tin về tội phạm", None, [
   (r"\b(?:crime[- ])?information sources?(?: (?:on|of|about) crimes?)?\b", "sources of crime reports"),
   (r"\bsources? of (?:information (?:on|about|of) )?crimes?(?! report)\b", "sources of crime reports"),
   (r"\bcrime (?:information|news) sources?\b", "sources of crime reports"),
   (r"\bsources? of crime information\b", "sources of crime reports")], None),
 ("compliance-law", r"tuân theo pháp luật", None, [
   (r"\b(?:the )?observance of (?:the )?laws?\b", "compliance with law"),
   (r"\b(?:the )?law observance\b", "compliance with law"),
   (r"\blaw compliance\b", "compliance with law"),
   (r"\bcompliance with the laws?\b", "compliance with law"),
   (r"\b(?:the )?(?:following|abiding by|adherence to) (?:the )?laws?\b", "compliance with law")], r"compliance with law"),
 ("right-prosecute", r"quyền công tố|THQCT", None, [
   (r"\b(?:the )?(?:power|right)s? (?:of|to) (?:the )?(?:public )?prosecut(?:e|ion)\b", "the right to prosecute"),
   (r"\b(?:the )?(?:public )?prosecution (?:power|right)s?\b", "the right to prosecute"),
   (r"\b(?:the )?prosecutorial (?:power|right)s?\b", "the right to prosecute"),
   (r"\bexercis(e|ing) (?:of )?public prosecution\b", r"exercis\1 the right to prosecute")], r"right to prosecute"),
 ("lessons", r"rút kinh nghiệm", None, [
   (r"\b(?:notices?|notifications?) of (?:experience|experiences)(?: learning| drawing| withdrawal)?\b", "notices of lessons learned"),
   (r"\b(?:experience|experiences) (?:learning|drawing|withdrawal|lessons)\b", "lessons learned"),
   (r"\b(?:withdraw(?:al of)?|draw(?:ing)?|learn(?:ing)? from) (?:the )?experiences?\b", "draw lessons"),
   (r"\b(?:trials?|hearings?) for which experiences? (?:are|is) drawn\b", "lessons-learned hearings"),
   (r"\bto draw experiences?\b", "to draw lessons")], r"[Ll]esson"),
 ("lessons-trial", r"phiên tòa rút kinh nghiệm|phiên toà rút kinh nghiệm", None, [
   (r"\b(?:experience[- ]drawing|experience[- ]learning|experience) (court )?(trials?|hearings?)\b", r"lessons-learned \1\2")], None),
 ("preventive", r"biện pháp ngăn chặn|BPNC", None, [
   (r"\b(?:deterrent|restraint|restraining|restrictive|prevention|preventative|preclusive) measures?\b", "preventive measures"),
   (r"\bmeasures? (?:to prevent|of prevention)\b(?! the| from)", "preventive measures")], r"preventive measure"),
 ("coercive", r"biện pháp cưỡng chế", None, [(r"\b(?:forcible|compulsory|enforcing) measures?\b", "coercive measures")], None),
 ("involved-parties", r"đương sự", r"bị hại|nguyên đơn dân sự", [
   (r"\b(?:the )?(?:litigants|parties concerned|concerned parties|involved persons|litigating parties)\b", "involved parties"),
   (r"\b(?:the )?litigant\b", "involved party"), (r"\bthe parties involved\b", "involved parties")], r"involved part"),
 ("related-rights", r"quyền lợi,? nghĩa vụ liên quan", None, [
   (r"\b(?:related (?:interests|rights and interests) and obligations|interests and obligations related|related interests and duties|related rights and interests|rights and obligations related(?: thereto)?)\b", "related rights and obligations")], r"related rights and obligations"),
 ("accused", r"bị can", r"bị cáo|bị đơn|người bị tình nghi|nghi phạm|nghi can", [
   (r"\ba suspect\b", "an accused"), (r"\bsuspects'\b", "accused persons'"), (r"\bsuspects\b", "accused persons"), (r"\bsuspect's\b", "accused's"), (r"\bsuspect\b", "accused"),
   (r"\ba defendant\b", "an accused"), (r"\bdefendants\b", "accused persons"), (r"\bdefendant's\b", "accused's"), (r"\bdefendant\b", "accused")], r"[Aa]ccused"),
 ("custody-house", r"nhà tạm giữ", None, [(r"\b(?:temporary )?(?:detention|custody|holding|temporary-detention) (?:houses?|centers?|centres?|facilities|facility)\b(?=[^,;]*(?:,|and|/|\)|$)[^.]*detention camp)", None)], None),
 ("detention-camp", r"trại tạm giam", r"nhà tạm giữ", [(r"\b(?:temporary )?detention (?:centers?|centres?|houses?)\b", "__CAMP__")], None),
 ("victim", r"bị hại", r"người bị hại và|đại diện", [(r"\b(?:the )?(?:injured|aggrieved|harmed|damaged) (?:persons?|part(?:y|ies))\b", "__VICTIM__")], r"[Vv]ictim"),
 ("defence", r"người bào chữa", None, [(r"\bdefenders?\b", "defense counsel"), (r"\bdefence counsel\b", "defense counsel")], r"defense counsel"),
 ("termination", r"đình chỉ", r"tạm đình chỉ|án treo|hoãn", [
   (r"\bsuspension\b", "termination"), (r"\bsuspensions\b", "terminations"), (r"\bsuspended\b", "terminated"), (r"\bsuspends\b", "terminates"),
   (r"\bsuspending\b", "terminating"), (r"\bsuspend\b", "terminate")], None),
 ("thahs", r"thi hành án hình sự|THAHS", r"dân sự|THADS", [
   (r"\bcriminal judgments? enforcement\b", "criminal judgment execution"),
   (r"\benforcement of criminal judgments?\b", "execution of criminal judgments"),
   (r"\bcriminal (?:execution|enforcement) agenc(y|ies)\b", r"criminal judgment execution agenc\1")], None),
 ("thads", r"thi hành án dân sự|THADS|Chấp hành viên|CHV", r"hình sự|THAHS", [
   (r"\bcivil judgments? execution\b", "civil judgment enforcement"),
   (r"\bexecution of civil judgments?\b", "enforcement of civil judgments"),
   (r"(?<!criminal )\bjudgment execution\b", "judgment enforcement"),
   (r"\bcivil execution\b", "civil judgment enforcement")], None),
 ("enforcement-officer", r"Chấp hành viên|CHV\b", None, [(r"\b(?:executors?|enforcers?|bailiffs?|executive officers?|enforcement executors?)\b", "__EO__")], r"enforcement officer"),
 ("skills-case", r"kỹ năng kiểm sát (?:án|việc) (?:dân sự|hình sự|hành chính)", None, [
   (r"\b(civil|criminal|administrative) (?:judgments?|cases?) (?:prosecution|supervision|procuratorial|control|prosecuting) skills\b", r"skills for supervising \1 cases")], None),
 ("app-name", r"(?-i:Kỹ năng Kiểm sát)(?! án)", None, [(r"\b(?:Prosecution|Procuratorial|Supervision|Control|Procuracy|Prosecuting) Skills\b", "Prosecutorial Skills")], None),
 ("ks-conclusion", r"kết luận kiểm sát", None, [(r"\b(?:inspection|procuracy|control|supervisory|procuratorial|prosecution)( |'s )?conclusions?\b", None)], r"supervision conclusion"),
 ("ks-generic", r"kiểm sát", r"kiểm tra|thanh tra|kiểm soát|giám sát|khám|giám định|Kiểm sát viên|KSV|nghiệm|kiểm toán|kiểm định", [
   (r"\b(?:to|shall|must|will|may|and|or) control\b", None), (r"\bcontrolling\b", "supervising"), (r"\bcontrolled\b", "supervised"),
   (r"\bcontrol (of|over)\b", r"supervision \1"), (r"\binspection (of|over)\b", r"supervision \1"), (r"\binspecting\b", "supervising")], None),
 ("appellate-protest", r"(?:KN|kháng nghị) phúc thẩm", r"kháng cáo", [
   (r"\bappellate appeals?\b", "appellate protest"), (r"\bappeals? (?:of|against) (?:the )?first-instance\b", "appellate protest against first-instance")], None),
 ("file-not-profile", r"hồ sơ", r"lý lịch|nhân thân|hồ sơ cá nhân", [(r"\bprofile(s)?\b", r"file\1")], None),
 ("ks-sheet", r"Phiếu kiểm sát", None, [(r"\bProsecutor's (?:notice|note|notes) (?:of|on) (?:the )?", "Supervision sheet on the ")], None),
 ("ks-trial", r"Kiểm sát xét xử", None, [(r"\bTrial Procuracy\b", "Trial supervision"), (r"\bProsecutor's office at the same level\b", "same-level procuracy")], None),
 ("ks-office", r"cấp Viện kiểm sát", None, [(r"\bProsecutor's office\b", "procuracy level"), (r"\bregional institute\b", "regional procuracy")], None),
 ("lv", r"ngày LV", None, [(r"\b(\d+) days LV\b", r"\1 working days"), (r"\bAppeals Law\b", "Law on Complaints")], None),
 ("fmt", None, None, [
   (r"\b(Article \d+(?:\.\d+)*)\. -(?=\s|$)", r"\1"), (r"\b(Article \d+)\. ([Cc]lause)", r"\1, \2"),
   (r"\b(Article \d+(?:\.\d+)+)\. (?=[A-Z])", r"\1, "),
   (r"\b(first|re|provincial|district|counter|non|co|self|pre|post|cross|multi|inter|sub|commune|central|state|special|second|third|higher|lower|same|two|three|anti|top|grassroots|high) - (?=\w)", r"\1-")], None),
 ("milestones", r"mốc", None, [(r"\b(\d+) (?:landmarks?|molds?|moulds?|milestones?)\b", "__MS__")], None),
 ("virtual-assistant", r"Trợ lý ảo", None, [(r"\bvirtual assistance\b", "virtual assistant")], None),
 ("indictment", r"cáo trạng", None, [(r"\b(?:bills? of indictment|indictment documents?|charge sheets?)\b", "indictment")], r"[Ii]ndictment"),
 ("custody-not-detention", r"tạm giữ", r"tạm giam|tài sản|đồ vật|tài liệu|phương tiện|giấy phép|vật chứng|tang vật|hàng hóa|tiền|bằng lái|chứng chỉ", [
   (r"\btemporary custody\b", "custody"), (r"\btemporary detention\b", "custody"), (r"\btemporarily detained\b", "held in custody"), (r"\btemporary detainees?\b", "persons held in custody")], r"custody"),
]
CAP_SMALL={"of","the","and","to","on","for","in","with","a","an","or"}
def _style(src, rep):
    if src.isupper() and len(src)>3: return rep.upper()
    words=src.split()
    if len(words)>1 and all(w[0].isupper() for w in words if w.lower() not in CAP_SMALL and w[0].isalpha()):
        return " ".join(w if (i>0 and w.lower() in CAP_SMALL) else (w[0].upper()+w[1:]) for i,w in enumerate(rep.split()))
    if src[:1].isupper(): return rep[:1].upper()+rep[1:]
    return rep
SPECIAL={
 "__PROTEST__": lambda m: {"":"protest","ed":"protested","ing":"protesting","s":"protests"}[(m.group(1) or "").lower()],
 "__RECO__": lambda m: {"":"recommendation","s":"recommendations","ed":"recommended","ing":"recommending"}[(m.group(1) or "").lower()],
 "__CAMP__": lambda m: "detention camps" if m.group(0).lower().endswith("s") else "detention camp",
 "__VICTIM__": lambda m: "victims" if re.search(r"(?:s|ies)$",m.group(0),re.I) else "victim",
 "__COMPLAINANT__": lambda m: "complainants" if m.group(0).lower().endswith("s") else "complainant",
 "__CAGAINST__": lambda m: ("complaints" if m.group(0).lower().startswith("protests") else "complaint")+" against",
 "__COMPLAINT__": lambda m: {"":"complaint","s":"complaints","ed":"complained","ing":"complaining"}[(m.group(1) or "").lower()],
 "__MS__": lambda m: m.group(1)+(" milestone" if m.group(1)=="1" else " milestones"),
 "__EO__": lambda m: "enforcement officers" if m.group(0).lower().endswith("s") else "enforcement officer",
}
def _inv(m):
    a,b=m.group(1).lower(),m.group(2).lower()
    return "investigating agenc"+("ies" if b=="ies" else "y")
def _clerk(m): return "court clerks" if m.group(1).lower()=="ies" else "court clerk"
COMPILED=[]
for rid,vc,vn,subs,exp in R:
    cs=[]
    for bad,rep in subs:
        if rid=="investigating-agency": f=_inv
        elif rid=="court-clerk": f=_clerk
        elif rid=="ks-conclusion": f=lambda m: "supervision conclusions" if m.group(0).lower().endswith("s") else "supervision conclusion"
        elif rid=="ks-generic" and rep is None: f=lambda m: m.group(0)[:-len("control")]+"supervise"
        elif rid=="custody-house": f=lambda m: "custody houses" if m.group(0).lower().endswith(("s","ies")) else "custody house"
        elif rep in SPECIAL: f=SPECIAL[rep]
        else: f=None
        cs.append((re.compile(bad,re.I),rep,f))
    COMPILED.append((rid,re.compile(vc,re.I) if vc else None,re.compile(vn,re.I) if vn else None,cs,re.compile(exp) if exp else None))
def apply(vi, en, counter=None):
    out=en
    for rid,vc,vn,cs,exp in COMPILED:
        if vc and not vc.search(vi): continue
        if vn and vn.search(vi): continue
        for rx,rep,f in cs:
            def sub(m):
                if f: r=f(m)
                else: r=m.expand(rep)
                return _style(m.group(0), r)
            new=rx.sub(sub,out)
            if new!=out and counter is not None: counter[rid]+=1
            out=new
    MON=["January","February","March","April","May","June","July","August","September","October","November","December"]
    for mm,yy in set(re.findall(r"(?<![\d/])(0?[1-9]|1[0-2])/(\d{4})(?![\d/])", vi)):
        code=mm+"/"+yy
        if code not in out:
            out=re.sub(r"\b"+MON[int(mm)-1]+" "+yy+r"\b", code, out)
    # article fixes
    out=re.sub(r"\b([Aa]) (accused|enforcement officer|involved party|investigating agency|Prosecutor General)\b", lambda m: m.group(1)+("n " if m.group(2)[0] in "aeiouAEIOU" else " ")+m.group(2), out)
    out=re.sub(r"\b([Aa])n (investigating agency|Prosecutor General|people's assessor|trial panel|court clerk|custody house|detention camp|recommendation)\b", lambda m: m.group(1)+(("n " if m.group(2)[0] in "aeiou" else " "))+m.group(2), out)
    out=re.sub(r"\b(Organi[sz]ation of Criminal) Investigating Agencies\b", r"\1 Investigation Agencies", out)
    out=re.sub(r"\bthe the\b","the",out); out=re.sub(r"\bThe the\b","The",out)
    return out
def score(vi,en):
    s=0
    for rid,vc,vn,cs,exp in COMPILED:
        if not exp or (vc and not vc.search(vi)) or (vn and vn.search(vi)): continue
        s+= 1 if exp.search(en) else 0
    return s
def expected(vi):
    return [rid for rid,vc,vn,cs,exp in COMPILED if exp and (not vc or vc.search(vi)) and not (vn and vn.search(vi))]
