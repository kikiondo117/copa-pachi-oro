export function betweenRange(x: number, min: number, max: number) {
    return x >= min && x <= max;
  }

export function getRange(range: number) {
  for(const property in ranges){
    if(betweenRange(range, ranges[property].min, ranges[property].max)){
      return ranges[property].img;
    }
  }
}

const ranges = {
  'bronze': {min: 0, max: 1499, img: 'Bronze-Icon.svg'},
  'silver': {min: 1500, max: 1999, img: 'Silver-Icon.svg'},
  'gold': {min: 2000, max: 2499, img: 'Gold-Icon.svg'},
  'platinum': {min: 2500, max: 2999, img: 'Platinum-Icon.svg'},
  'diamond': {min: 3000, max: 3499, img: 'Diamond-Icon.svg'},
  'master': {min: 3500, max: 3999, img: 'Master-Icon.svg'},
  'grand-master': {min: 4000, max: 4499, img: 'GrandMaster-Icon.svg'},
  'top500': {min: 4500, max: 9999, img: 'Top500-Icon.svg'},
}