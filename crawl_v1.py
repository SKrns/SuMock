from urllib.request import urlopen
from bs4 import BeautifulSoup

html = urlopen("https://legendstudy.com/689")
year = "2015학년도"
month = "수능"

bsObject = BeautifulSoup(html, "html.parser") 

# convert_arr = ["국어","수학 가","수학 나","영어","한국사"]
convert_arr = ["국어 A","국어 B","수학 A","수학 B","영어"]

convert_add_science = ["물리I","물리II","생명 과학I","생명 과학II","지구 과학I","지구 과학II","화학I","화학II"]
convert_add_social = ["경제","동아시아사","법과 정치","사회 문화","생활과 윤리","세계사","세계 지리","윤리와 사상","한국사","한국 지리"]

convert_arr = convert_arr + convert_add_science + convert_add_social

convert_dic = []

problem_stack = []
question_stack = []

query_stack = []
idx = 0
for link in bsObject.body.find_all(style="display:inline-block;;height:auto;max-width:100%"):
	
	k = link.find('a')
	j= k.contents[1]
	# print( j ,k.get('href'))
	if("듣기" in j):
		continue
	if("min" in j):
		continue
	idx+=1
	if(idx%2==0):
		question_stack.append(k.get('href'))
	else:
		problem_stack.append(k.get('href'))

for i in range(len(convert_arr)):
	print('{"grade":"고3","year":"'+year+'","month":"'+month+'","subject":"'+convert_arr[i]+'","rank":["","","",""],"testPaper":"'+problem_stack[i]+'","testAnswer":"","testExplain":"'+question_stack[i]+'","__v":{"$numberInt":"0"}}')
