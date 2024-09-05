// 평가문제
//초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.

function searchByKoreanInitialSound(arr, keyword) {
  const KORGROUP = {
    ㄱ: "ㄱ가-깋",
    ㄴ: "ㄴ나-닣",
    ㄷ: "ㄷ다-딯",
    ㄹ: "ㄹ라-맇",
    ㅁ: "ㅁ마-밓",
    ㅂ: "ㅂ바-빟",
    ㅅ: "ㅅ사-싷",
    ㅇ: "ㅇ아-잏",
    ㅈ: "ㅈ자-짛",
    ㅊ: "ㅊ차-칳",
    ㅋ: "ㅋ카-킿",
    ㅌ: "ㅌ타-팋",
    ㅍ: "ㅍ파-핗",
    ㅎ: "ㅎ하-힣",
  };
  const regStr = [...keyword].reduce((acc, cur) => {
    if (KORGROUP[cur]) acc += `[${KORGROUP[cur]}]`;
    else acc += `[${cur}]`;
    return acc;
  }, "");
  // console.log(new RegExp(regStr, "g"));
  return arr.filter((a) => new RegExp(regStr, "g").test(a));
}

s = ["강원도 고성군", "고성군 토성면", "토성면 북면", "북면", "김1수"];
console.log(searchByKoreanInitialSound(s, "ㄱㅅㄱ"));
console.log(searchByKoreanInitialSound(s, "ㅌㅅㅁ"));
console.log(searchByKoreanInitialSound(s, "ㅂㅁ"));
console.log(searchByKoreanInitialSound(s, "ㅍㅁ"));
console.log(searchByKoreanInitialSound(s, "ㄱ1ㅅ"));
