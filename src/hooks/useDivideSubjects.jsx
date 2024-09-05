const useDivideSubjects = (subjects, teachers) => {
    let arr = Array();
    let currT = 0, currS = 0, count = 0;
    while (count < Math.max(subjects, teachers)) {
        arr[currT] = arr[currT] == null ? [currS + 1] : [...arr[currT], currS + 1];
        currS = (currS + 1) % subjects;
        currT = (currT + 1) % teachers;
        count++;
    }
    return arr;
}

export default useDivideSubjects