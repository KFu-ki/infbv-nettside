from pathlib import Path
from datetime import date
import re,sys

def ordinal(n):
    if 10 <= n % 100 <= 20: s="th"
    else: s={1:"st",2:"nd",3:"rd"}.get(n%10,"th")
    return f"{n}<sup>{s}</sup>"

d=date.today()
stamp=f"{ordinal(d.day)} of {d.strftime('%B')}, {d.year}"
for name in sys.argv[1:]:
    p=Path(name)
    if p.suffix==".html" and "mmp311" in p.parts:
        t=p.read_text(encoding="utf-8")
        t=re.sub(r"(Volda University College, )\d{1,2}<sup>(?:st|nd|rd|th)</sup> of [A-Za-z]+, \d{4}(\.)",rf"\g<1>{stamp}\g<2>",t)
        p.write_text(t,encoding="utf-8")
