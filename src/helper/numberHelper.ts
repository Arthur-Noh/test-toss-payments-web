// 숫자의 3 자리수 마다 , 를 넣어주는 함수
export const localeNumber = (target: number): string => {
    return target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};