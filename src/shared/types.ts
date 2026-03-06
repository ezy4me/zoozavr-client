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

export interface ITest {
  id: number;
  name: string;
  passingScore: number;
  maxScore: number;
  attempts: number;
  questions: IQuestion[];
}

export interface IMaterial {
  id: number;
  name: string;
  contentPath: string;
  content?: string;
  isCompleted: boolean;
  orderNumber: number;
}

export interface ICourse {
  id: number;
  name: string;
  description: string;
  testId?: number;
  materials: IMaterial[];
  minPoints: number;
  maxPoints: number;
  subcategoryId: number;
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
