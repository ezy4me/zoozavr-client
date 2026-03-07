export interface IOption {
  id: string;
  text: string;
}

export interface IQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ITestResult {
  id: number;
  score: number;
  userId: number;
  testId: number;
}

export interface ITest {
  id: number;
  courseId: number;
  passingScore: number;
  questions: IQuestion[];
  results?: ITestResult[];
}

export interface IMaterial {
  id: number;
  name: string;
  contentPath: string;
  orderNumber: number;
  isCompleted: boolean;
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  maxPoints: number;
  minPoints: number;
  materials: IMaterial[];
  tests: ITest[]; 
}

export interface ISubcategory {
  id: number;
  name: string;
  categoryId: number;
  courses?: ICourse[];
  _count?: {
    courses: number;
  };
}

export interface ICategory {
  id: number;
  name: string;
  subcategories?: ISubcategory[];
  _count?: {
    subcategories: number;
  };
}

export interface IUser {
  id: number;
  fullName: string;
  login: string;
  role: "student" | "admin";
  xp: number;
  createdAt: string;
}

export interface IUserActivity extends IUser {
  userCourses: {
    course: { name: string };
    status: { name: string };
    points: number;
  }[];
  testResults: {
    test: { name: string };
    score: number;
    completedAt: string;
  }[];
  _count: {
    testResults: number;
  };
}

export interface ITestResultResponse {
  message: string;
  result: {
    score: number;
    isPassed: boolean;
    pointsEarned: number;
  };
}
