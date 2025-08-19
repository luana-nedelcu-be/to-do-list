import { ItemsListService } from "./items-list.service";

describe("ItemsListService", () => {
  it("should getResetButtonVisible", () => {
    const itemsListService = new ItemsListService();

    itemsListService["_resetButtonVisible$"].next(true);
    itemsListService.getResetButtonVisible().subscribe((value) => {
      expect(value).toBeTrue();
    });
  });

  it("should setResetButtonVisible", () => {
    const itemsListService = new ItemsListService();
    const nextSpy = spyOn(itemsListService["_resetButtonVisible$"], "next")
    itemsListService.setResetButtonVisible(false);
    expect(nextSpy).toHaveBeenCalledWith(
      false,
    );
  });
});
