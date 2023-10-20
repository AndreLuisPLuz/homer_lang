import sys

dict = {"duff" : "20", "dooh" : "10", "donuts" : "30", "episode":"40"}
function = []
file_name = sys.argv[1]
i=0
f = open(file_name, "r")
lines = f.readlines()
argsList = []
fcolchete = 0

for line in lines:
  for key in dict.keys():
    if key in line:
      cline = line.split("(")
      print(cline)
      cline[1] = cline[1].replace(")", "")
      cline[0] = dict[cline[0]]
      
      for args in cline[1]:
        if(args != "/n"):
          argsList.append(bytes(args, 'ascii'))   
          function.append(cline[0])
          lastf = cline[0]
  if '{' in line.strip():
    print("1")
    argsList.append(bytes("{", 'ascii'))
    function.append(lastf)
    fcolchete = lastf
  if '}' in line.strip():
    print("2")
    argsList.append(bytes("}", 'ascii'))
    function.append(fcolchete)
with open("encode.txt", "w") as txt:
    for args in argsList:
      for j in args:
        txt.write(function[i] + " " + str(j) + "\n")
      i += 1
      