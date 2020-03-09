from urllib.request import urlopen
from bs4 import BeautifulSoup
import requests
# headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}
# url ='http://blog.naver.com/PostView.nhn?blogId=ryugiin&logNo=221392934987&categoryNo=561&parentCategoryNo=0&viewDate=&currentPage=2&postListTopCurrentPage=1&from=search&userTopListOpen=true&userTopListCount=5&userTopListManageOpen=false&userTopListCurrentPage=2'
# html = requests.get(url, headers = headers).text
# print(html)
html = urlopen("https://m.blog.naver.com/PostView.nhn?blogId=ryugiin&logNo=221392934987&categoryNo=561&parentCategoryNo=0&viewDate=&currentPage=2&postListTopCurrentPage=1&from=search&userTopListOpen=true&userTopListCount=5&userTopListManageOpen=false&userTopListCurrentPage=2")
year = "2018학년도"
month = "수능"

bsObject = BeautifulSoup(html, "html.parser") 

convert_arr = ["국어","수학 가","수학 나","영어","한국사"]
# convert_arr = ["국어 A","국어 B","수학 A","수학 B","영어"]

convert_add_science = ["물리I","물리II","생명 과학I","생명 과학II","지구 과학I","지구 과학II","화학I","화학II"]
convert_add_social = ["경제","동아시아사","법과 정치","사회 문화","생활과 윤리","세계사","세계 지리","윤리와 사상","한국 지리"]

convert_arr = convert_arr + convert_add_social + convert_add_science

convert_dic = []

problem_stack = []
question_stack = []

query_stack = []
idx = 0
for link in bsObject.body.find_all('a',class_="se_link"):
	# print(link)
	if(len(link.contents)==1):
		k=link.contents[0]
		idx+=1
		if(idx%2==0):
			question_stack.append(k)
		else:
			problem_stack.append(k)

for i in range(len(convert_arr)):
	print('{"grade":"고3","year":"'+year+'","month":"'+month+'","subject":"'+convert_arr[i]+'","rank":["","","",""],"testPaper":"'+problem_stack[i]+'","testAnswer":"","testExplain":"'+question_stack[i]+'","__v":{"$numberInt":"0"}}')
