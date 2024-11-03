import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Person} from "../../../models/person";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styles: [
  ]
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  filteredPeople: Person[] = [];
  departments: string[] = [];
  selectedLanguage: string = 'en-us';
  selectedSorting: string = 'asc';
  selectedDepartment: string = '';
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updatePeople();
  }

  public onLanguageChange(e: any) {
    this.selectedLanguage = e.target.value;
    this.updatePeople();
  }
  
  public onSortingChange(e: any) {
    this.selectedSorting = e.target.value;
    this.updatePeople();
  }

  public onDepartmentChange(e: any) {
    this.selectedDepartment = e.target.value;
    this.filteredPeople = 
        this.selectedDepartment === 'all' 
            ? this.people 
            : this.people.filter(person => person.departments.some(c => c === this.selectedDepartment));
  }
  
  private updatePeople(): void {
    const url = environment.umbracoContentApiUrl + 'content?filter=' + encodeURIComponent('contentType:person') + '&sort=' + encodeURIComponent('name:') + this.selectedSorting;
    const options = {
      headers: {'Content-Type':'application/json; charset=utf-8','Accept-Language':this.selectedLanguage}
    };
    
    this.http.get<any>(url, options).subscribe(data => {
      this.people = data.items.map(r => new Person(r.name, r.route.path, environment.baseImageUrl + r.properties.photo[0].url, r.properties.department ? r.properties.department : []));
      this.filteredPeople = this.people;
      this.updateDepartments();
    });
  }
  
  private updateDepartments(): void {
    const departments = [];
    this.people.forEach(r => {
      r.departments.forEach(c => departments.push(c))
    }); 
    // remove duplicates
    this.departments = departments.filter(function (x, i, a) {
      return a.indexOf(x) === i;
    });
  }
}
