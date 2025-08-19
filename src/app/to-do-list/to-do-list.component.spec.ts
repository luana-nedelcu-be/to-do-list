import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ItemsListService } from "../services/items-list.service";
import { ToDoListComponent } from "./to-do-list.component";

describe("ToDoListComponent", () => {
  let component: ToDoListComponent;
  let itemsListServiceMock: jasmine.SpyObj<ItemsListService>;
  let fbServiceMock: jasmine.SpyObj<FormBuilder>;

  beforeEach(() => {
    // Arrange
    itemsListServiceMock = jasmine.createSpyObj("ItemsListService", [
      "setResetButtonVisible",
      "getResetButtonVisible",
    ]);

    fbServiceMock = jasmine.createSpyObj("FormBuilder", [
      "group",
      "control",
      "array",
    ]);

    component = new ToDoListComponent(itemsListServiceMock, fbServiceMock);

    component.itemsGroup = new FormGroup({
      newItem: new FormControl("item"),
      items: new FormArray([] as FormControl[]),
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should addItem", () => {
    fbServiceMock.control.and.returnValue(new FormControl(false));
    const resetSpy = spyOn(component.itemsGroup.controls["newItem"], "reset");
    // Act
    component.addItem();

    // Assert
    expect(component.items.length).toEqual(1);
    expect(component.itemLabels.length).toEqual(1);
    expect(component.itemLabels).toEqual(["item"]);
    expect(resetSpy).toHaveBeenCalled();
    expect(itemsListServiceMock.setResetButtonVisible).toHaveBeenCalledWith(
      true,
    );
  });

  describe("handleItemDeleted", () => {
    it("should not setResetButtonVisible", () => {
      component.itemsGroup.controls["items"] = new FormArray([
        new FormControl(true),
        new FormControl(false),
        new FormControl(true),
      ] as FormControl[]);
      component.itemLabels = ["item 1", "item 2", "item 3"];

      component.handleItemDeleted(1);

      expect(component.items.length).toEqual(2);
      expect(component.itemLabels.length).toEqual(2);
      expect(itemsListServiceMock.setResetButtonVisible).not.toHaveBeenCalled();
    });

    it("should setResetButtonVisible", () => {
      component.itemsGroup.controls["items"] = new FormArray([
        new FormControl(true),
      ] as FormControl[]);
      component.itemLabels = ["item 1"];

      component.handleItemDeleted(0);

      expect(component.items.length).toEqual(0);
      expect(component.itemLabels.length).toEqual(0);
      expect(itemsListServiceMock.setResetButtonVisible).toHaveBeenCalledWith(
        false,
      );
    });
  });

  it("should resetList", () => {
    component.itemsGroup.controls["items"] = new FormArray([
      new FormControl(),
    ]);
    component.itemLabels = ["item 1"]
    fbServiceMock.array.and.returnValue(new FormArray([] as FormControl[]));

    component.resetList();

    expect(component.items.length).toEqual(0);
    expect(component.itemLabels.length).toEqual(0);
    expect(itemsListServiceMock.setResetButtonVisible).toHaveBeenCalledWith(
      false,
    );
  });
});
