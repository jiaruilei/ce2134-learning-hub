const KEY='ce2134-learning-hub.v1';
const empty=()=>({version:1,reviewed:{},attempts:[],session:null});
export function createStore(storage){
  let data=empty(),available=true;
  try{
    const saved=JSON.parse(storage.getItem(KEY)||'null');
    if(saved?.version===1){
      data.reviewed=saved.reviewed&&typeof saved.reviewed==='object'&&!Array.isArray(saved.reviewed)?saved.reviewed:{};
      data.attempts=Array.isArray(saved.attempts)?saved.attempts.filter(a=>a&&typeof a.questionId==='string'&&typeof a.topic==='string'&&typeof a.correct==='boolean'&&typeof a.at==='string'):[];
      data.session=saved.session||null;
    }
    storage.setItem(KEY,JSON.stringify(data));
  }catch{available=false;}
  return {
    get data(){return data;},get available(){return available;},
    save(){try{storage.setItem(KEY,JSON.stringify(data));available=true;}catch{available=false;}},
    clear(){data=empty();this.save();}
  };
}
