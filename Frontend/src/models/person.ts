export class Person {
    name: string;
    path: string;
    photoUrl: string;
    departments: string[];
    
    constructor(name: string, path: string, photoUrl: string, departments: string[]) {
        this.name = name;
        this.path = path;
        this.photoUrl = photoUrl;
        this.departments = departments;
    }
    
    get departmentsLabel(): string {
        return this.departments.join(', '); 
    }
}