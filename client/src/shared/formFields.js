const requiredRule = {
  required: true,
  message: 'This field is required!',
};

const urlRule = {
  pattern: new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm),
  message: 'Invalid URL',
}

export const awardCertificateFormFields = [
  {
    label: 'Candidate Name',
    name: 'candidateName',
    rules: [requiredRule]
  },
  {
    label: 'Position',
    name: 'position',
    rules: [requiredRule],
  },
  {
    label: 'Presenter',
    name: 'presenter',
    rules: [requiredRule],
  },
  {
    label: "Presenter's Designation",
    name: 'presenterDesignation',
    rules: [requiredRule],
  },
  {
    label: 'Duration',
    name: 'duration',
    rules: [requiredRule],
    type: 'date'
  }
];

export const registerCompanyFormFields = [
  {
    label: 'Company Name',
    name: 'company',
    rules: [requiredRule]
  },
  {
    label: 'Website',
    name: 'website',
    rules: [requiredRule, urlRule]
  },
  {
    label: 'Company Logo URL',
    name: 'logo',
    rules: [requiredRule, urlRule]
  }
];