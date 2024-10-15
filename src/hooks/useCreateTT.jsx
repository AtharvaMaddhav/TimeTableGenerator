const useCreateTT = (subjects, lectures, weekdays, labs) => {
    console.log(Math.ceil((subjects * lectures+Number(labs)) / weekdays));
    
    let matrix = [...Array(Math.ceil((subjects * lectures+Number(labs)) / weekdays))].map(e => Array(weekdays).fill(0));
    let total = 0;
    let currR = 0, currC = 0, currS = 1, currL = 0;
    while (total < subjects * lectures + Number(labs)) {
        if(total >= subjects * lectures ){
            matrix[currR][currC] = -1 *(currL+1);
            
            currL = (currL+1) % subjects;
        }
        else matrix[currR][currC] = currS;
        currC = (currC + 2) % weekdays;
        if (weekdays % 2 == 0 && total % weekdays != 0 && currC == 0) currC++;
        total++;
        if (total % lectures == 0) currS++;
        if (total % weekdays == 0) {
            currR++;
            if (weekdays % 2 == 0) currC = 0;
        }
    }
    console.log(matrix);
    return matrix;
}

export default useCreateTT