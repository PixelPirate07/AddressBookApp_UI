import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
    @Output() addNew = new EventEmitter<void>();
    @Output() editPerson = new EventEmitter<any>();
    @Output() deletePerson = new EventEmitter<number>();
    
    @Input() personList: any[] = []; // Hardcoded data removed

    constructor(private personService: PersonService) {}

    ngOnInit(): void {
        this.loadPersons();  // Data fetching on component load
    }

    loadPersons(): void {
        this.personService.getAllContacts().subscribe({
            next: (data) => this.personList = data,
            error: (err) => console.error('Error fetching data:', err)
        });
    }

    onEdit(person: any) {
        this.editPerson.emit(person);
    }

    onDelete(id: number) {
        this.deletePerson.emit(id);
    }

    showForm() {
        this.addNew.emit();
    }
}
