const Mongodb_sutd = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/sutd";

Mongodb_sutd.connect(url, async function (err, db){
    if(err) throw err;
    //console.log("Database created!");
    const dbo = db.db('sutd');
    const myobj = [
        {student_id: 1004801, average_grade: 0, full_name: "Student Name1", grades: [], term: 0},
        {student_id: 1004802, average_grade: 0, full_name: "Student Name2", grades: [], term: 0},
        {student_id: 1004803, average_grade: 0, full_name: "Student Name3", grades: [], term: 0},
        {student_id: 1004804, average_grade: 0, full_name: "Student Name4", grades: [], term: 0},
        {student_id: 1004805, average_grade: 0, full_name: "Student Name5", grades: [], term: 0},
        {student_id: 1004806, average_grade: 0, full_name: "Student Name6", grades: [], term: 0},
        {student_id: 1004807, average_grade: 0, full_name: "Student Name7", grades: [], term: 0},
        {student_id: 1004808, average_grade: 0, full_name: "Student Name8", grades: [], term: 0},
        {student_id: 1004809, average_grade: 0, full_name: "Student Name9", grades: [], term: 0},
        {student_id: 1004810, average_grade: 0, full_name: "Student Name10", grades: [], term: 0},
        {student_id: 1004811, average_grade: 0, full_name: "Student Name11", grades: [], term: 0},
        {student_id: 1004812, average_grade: 0, full_name: "Student Name12", grades: [], term: 0},
        {student_id: 1004813, average_grade: 0, full_name: "Student Name13", grades: [], term: 0},
        {student_id: 1004814, average_grade: 0, full_name: "Student Name14", grades: [], term: 0},
        {student_id: 1004815, average_grade: 0, full_name: "Student Name15", grades: [], term: 0},
        {student_id: 1004816, average_grade: 0, full_name: "Student Name16", grades: [], term: 0},
        {student_id: 1004817, average_grade: 0, full_name: "Student Name17", grades: [], term: 0},
        {student_id: 1004818, average_grade: 0, full_name: "Student Name18", grades: [], term: 0},
        {student_id: 1004819, average_grade: 0, full_name: "Student Name19", grades: [], term: 0},
        {student_id: 1004820, average_grade: 0, full_name: "Student Name20", grades: [], term: 0}
    ];
    let collec = await dbo.collection('students');
    await collec.insertMany(myobj);

    let avg;

    for (let i = 1; i<=8; i++){
        for(let student of myobj){
            let new_grade1 = getRandomIntInclusive(0, 100);
            let new_grade2 = getRandomIntInclusive(0, 100);
            let new_grade3 = getRandomIntInclusive(0, 100);
            let new_grade4 = getRandomIntInclusive(0, 100);

            let set_grade = {$push: {grades: {$each:[new_grade1, new_grade2, new_grade3, new_grade4]}}};
            let inc_term = {$inc: {term: 1}}
            await collec.updateOne({student_id: student.student_id}, set_grade);
            await collec.updateOne({student_id: student.student_id}, inc_term);
        }
    }

    for (let student of myobj){
        let avg_score = 0;
        avg = await collec.find({student_id: student.student_id}).project({_id: 0, grades:1}).toArray();
        //console.log(avg);
        //console.log(typeof avg);
        let dict = avg[0];
        let dict_contect = dict["grades"];
        //console.log(dict_contect);
        for(let single_grade of dict_contect){
            avg_score += (single_grade/32);
        }
        let set_avg = {$set: {average_grade: avg_score}}
        await collec.updateOne({student_id: student.student_id}, set_avg);
    }
    let sorted_students = await collec.find().sort({average_grade: -1}).toArray();
    for(let student of sorted_students){
        let student_info = await collec.find({student_id: student.student_id}).project({_id: 0}).toArray();
        console.log(student_info);
    }
    await db.close();
})



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);}
