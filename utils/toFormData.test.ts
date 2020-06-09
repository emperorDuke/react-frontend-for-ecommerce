import { toFormData } from "./ObjectToFormData";

const date = new Date();

const object = [
  {
    attribute: date,
    verbose: [],
    variant: {
      vendor_metric: ["L", "j"],
      metric_verbose_name: "Large",
      image: true,
    },
    foo: {
      baaz: null
    }
  },
  {
    attribute: "size",
    verbose: {},
    variant: {
      vendor_metric: [{ size: "XL" }, { color: "blue" }],
      metric_verbose_name: "Large",
      image: false
    },
    foo: {
      baaz: 1
    }
  }
];

test("it converts it to a nested formData", () => { 
  let formData = toFormData(object);
  
  expect(formData.has("[0][attribute]")).toBeTruthy();
  expect(formData.get("[1][verbose][]")).toEqual("{}");
  expect(formData.has("[0][variant][vendor_metric][0]")).toBeTruthy();
  expect(formData.get("[1][variant][vendor_metric][0][size]")).toEqual('XL');
  expect(formData.get("[1][foo][baaz]")).toEqual("1");
  expect(formData.get("[0][foo][baaz]")).toEqual("null");
  expect(formData.get("[0][variant][image]")).toEqual("true");
});

test("it works with just object",  () => {
  let formData = toFormData(object[0]);

  expect(formData.get("[attribute]")).toEqual(date.toISOString())
  expect(formData.get("[verbose][]")).toEqual("[]");
  expect(formData.has("[variant][vendor_metric][0]")).toBeTruthy();
});
