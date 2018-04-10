// function to remove the object from array
function removeObject(array,object){
	var index = 0;
	for(var i=0;i<array.length;i++){
		if(array[i]==object){
			array.splice(i,1);
			break;
		}
	}
};

// a class to save information about a course
class course{
	constructor(majorCode,courseCode,courseName,courseCredit){
		this.majorCode=majorCode;
		this.courseCode=courseCode;
		this.courseName=courseName;
		this.courseCredit=courseCredit;
	};
}


// A cass to save all degree information
class degree{
	constructor(major1,credit1,major2,credit2,creditOutside,creditGraduate){
		this.major1=major1;
		this.credit1=credit1;
		this.major1Courses = [];

		this.major2=major2;
		this.credit2=credit2;
		this.major2Courses = [];

		this.creditOutside = creditOutside;
		this.outsideCourses = [];

		// save all taken courses' majors and color
		this.courseMajors=[];

		// save all courses;
		this.allCourses= [];

		this.creditGraduate=creditGraduate;

	};

	// function to add Course
	addCourse(course){
		// add into correct array
		if(course.majorCode==this.major1){
			this.major1Courses.push(course);
		}
		else if (course.majorCode==this.major2) {
			this.major2Courses.push(course);
		}
		else{
			this.outsideCourses.push(course);
		}

		// add to general array
		if(!this.allCourses.includes(course)){
			this.allCourses.push(course);
		}
		// add major code
		if(!this.courseMajors.includes(course.majorCode)){
			this.courseMajors.push(course.majorCode);
		}
	};

	// function to remove course
	removeCourse(course){	
		removeObject(this.major1Courses,course);
		removeObject(this.major2Courses,course);
		removeObject(this.outsideCourses,course);
		removeObject(this.allCourses,course);	
	};

	// return the sum of all credits in given array of courses
	sumCredit(courses){
		var sum=0;
		for(var i=0;i<courses.length;i++){
			sum=sum+parseInt(courses[i].courseCredit);
		}
		return sum;

	};

	// return needed credits for given major/outside
	neededCredit(part){
		if(part=="major1"){

			return Math.max(this.credit1-this.sumCredit(this.major1Courses),0);
		}
		else if(part=="major2"){
			return Math.max(this.credit2-this.sumCredit(this.major2Courses),0);
		}
		else if(part=="outside"){
			return Math.max(this.creditOutside-this.sumCredit(this.outsideCourses),0);
		}
		else{
			return Math.max(this.creditGraduate-this.sumCredit(this.allCourses),0);
		}
	};

	// rearrage courses if it's changed
	rearrageCourses(){
		this.major1Courses=[];
		this.major2Courses=[];
		this.outsideCourses=[];
		for(var i=0;i<this.allCourses.length;i++){
			this.addCourse(this.allCourses[i]);
		}
	};

}

// a list of color
var colors = ["#CC6699","#FFCCCC","#99CC00","#66CCCC","#FFCC99","#FFCC00","#CCCC99",
"#0099CC","#3399CC","#CC3333","#FFCC33","#FF9933","#FFCC99","#FF6666"];
