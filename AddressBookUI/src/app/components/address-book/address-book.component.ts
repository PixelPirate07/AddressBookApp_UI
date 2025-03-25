import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  isFormVisible = false;
  personList: any[] = [];

  selectedPerson: any = null;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  // Load persons from API
  loadPersons(): void {
    this.personService.getAllContacts().subscribe({
      next: (data) => {
        this.personList = data;
      },
      error: (err) => {
        console.error('Error fetching persons:', err);
      }
    });
  }

  // Show Form
  showForm() {
    this.isFormVisible = true;
    this.selectedPerson = null;
  }

  // Hide Form
  hideForm() {
    this.isFormVisible = false;
  }

  // Add New Person
  addPerson(newPerson: any) {
    if (this.selectedPerson) {
      this.personService.updateContact(this.selectedPerson.id, newPerson).subscribe({
        next: () => this.loadPersons(),
        error: (err) => console.error('Error updating person:', err)
      });
    } else {
      this.personService.addContact(newPerson).subscribe({
        next: () => this.loadPersons(),
        error: (err) => console.error('Error adding person:', err)
      });
    }
    this.hideForm();
  }

  // Edit Person
  editPerson(person: any) {
    this.selectedPerson = { ...person };
    this.isFormVisible = true;
  }

  // Delete Person
  deletePerson(id: number) {
    this.personService.deleteContact(id).subscribe({
      next: () => this.loadPersons(),
      error: (err) => console.error('Error deleting person:', err)
    });
  }
}
