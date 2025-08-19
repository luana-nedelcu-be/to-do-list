import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { ItemsListService } from "../services/items-list.service";

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.scss"],
})
export class ToDoListComponent implements OnInit {
  resetButtonVisible = false;
  itemsGroup = this.fb.group({
    newItem: [""],
    items: this.fb.array([]),
  });
  itemLabels: string[] = [];

  constructor(
    private itemsListService: ItemsListService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.itemsListService
      .getResetButtonVisible()
      .subscribe((visible: boolean) => (this.resetButtonVisible = visible));
  }

  get items() {
    return this.itemsGroup.controls["items"] as FormArray;
  }

  addItem() {
    const itemControl = this.fb.control(false);
    this.items.push(itemControl);
    this.itemLabels.push(this.itemsGroup.controls["newItem"].value ?? "");

    this.itemsGroup.controls["newItem"].reset();
    this.itemsListService.setResetButtonVisible(true);
  }

  handleItemDeleted(index: number): void {
    this.items.removeAt(index);
    this.itemLabels = [
      ...this.itemLabels.slice(0, index),
      ...this.itemLabels.slice(index + 1),
    ];
    if (!this.itemLabels.length) {
      this.itemsListService.setResetButtonVisible(false);
    }
  }

  resetList() {
    const emptyArray: FormControl[] = [] as FormControl[];
    this.itemsGroup.controls["items"] = this.fb.array(emptyArray);
    this.itemLabels = [];
    this.itemsListService.setResetButtonVisible(false);
  }
}
