/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

// Convert data blob to base64
export function tree(data = [], id = 0, type = "") {
  let treeData = data.filter(item => item.parent_id == id);

  treeData = treeData.map(item=>{
      let children = tree(data,item.id,type);
      switch (type) {
        case 'treeSelect':
            return children.length === 0
                ? ({
                    title: item.name,
                    value: item.id,
                    key: item.id,
                })
                : ({
                    title: item.name,
                    value: item.id,
                    key: item.id,
                    children,
                });
        case 'tree':
            return children.length === 0
                ? ({
                    title: item.name,
                    key: item.id,
                })
                : ({
                    title: item.name,
                    key: item.id,
                    children,
                });
        default:
            return children.length === 0 ? item : ({...item, children });
        }
  })

  return treeData;
}


export  function romanize (num) {
  if (!+num)
      return false;
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
}