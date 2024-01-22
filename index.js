//text
const dataInput = document.querySelector("#data");
dataInput.value;
console.log(dataInput.value);
//image format
const imageFormat = document.querySelector('input[name="format"]:checked');
//colors
const mainColorpicker = document.querySelector("#main-color");
const backgroundColorpicker = document.querySelector("#bg-color");

const mainColorValue = document.querySelector("#color-value");
const backgroundColorValue = document.querySelector("#bg-color-value");

const updateColor = (e) => {
  const value = e.target.value;
  //console.log({value});
  mainColorValue.innerText = value;
};

const updateBackgroundColor = (e) => {
  const value = e.target.value;
  backgroundColorValue.innerText = value;
};

const colorPickerEventListener = () => {
  mainColorpicker.addEventListener("change", updateColor);
  backgroundColorpicker.addEventListener("change", updateBackgroundColor);
};

colorPickerEventListener();

//sliders
const sizeSlider = document.querySelector("#size");
const marginSlider = document.querySelector("#margin");

const sizeValue = document.querySelector("#size-value");
const marginValue = document.querySelector("#margin-value");

const updateSize = (e) => {
  const value = e.target.value;
  sizeValue.innerText = `${value} X ${value}`;
};

const updateMargin = (e) => {
  const value = e.target.value;
  marginValue.innerText = `${value} px`;
};

const sliderEventListener = () => {
  sizeSlider.addEventListener("change", updateSize);
  marginSlider.addEventListener("change", updateMargin);
};

sliderEventListener();

const submitButton = document.querySelector("#submitButton");

const showInputError = () => {
  dataInput.classList.add("error");
};

const dataInputEventListener = () => {
  dataInput.addEventListener("change", (e) => {
    if (e.target.value !== "") {
      dataInput.classList.remove("error");
      submitButton.removeAttribute("disabled");
    } else {
      dataInput.classList.add("error");
      submitButton.setAttribute("disabled", true);
    }
  });
};

dataInputEventListener();

const prepareParameters = (params) => {
  return {
    data: params.data,
    size: `${params.size} X ${params.size}`,
    color: params.color.replace("#", ""),
    bgcolor: params.bgColor.replace("#", ""),
    qzone: params.qZone,
    format: params.format,
  };
};

const settingsContainer = document.querySelector("#qr-code-settings");
const resultsContainer = document.querySelector("#qr-code-result");
const qrCodeImage = document.querySelector("#qr-code-image");
const displayQrCode = (imgUrl) => {
  settingsContainer.classList.add("flipped");
  resultsContainer.classList.add("flipped");
  qrCodeImage.setAttribute("src", imgUrl);
};

const getQrCode = (parameters) => {
  const baseURL = "https://api.qrserver.com/v1/create-qr-code/";
  const urlParams = new URLSearchParams(parameters).toString();

  fetch(`${baseURL}?${urlParams}`).then((response) => {
    if (response.status === 200) {
      displayQrCode(`${baseURL}?${urlParams}`);
    }
  });
};

const onSubmit = () => {
  console.log("clicked");
  const data = dataInput.value;
  if (!data.length) {
    return showInputError();
  }
  const color = mainColorpicker.value;
  const bgColor = backgroundColorpicker.value;
  const size = sizeSlider.value;
  const qZone = marginSlider.value;
  const format = imageFormat.value;

  const parameters = prepareParameters({
    data,
    color,
    bgColor,
    size,
    qZone,
    format,
  });
  //console.log(data,color,bgColor,size,qZone,format)

  getQrCode(parameters);
};

const sibmitEventListener = () => {
  submitButton.addEventListener("click", onSubmit);
};

sibmitEventListener();
