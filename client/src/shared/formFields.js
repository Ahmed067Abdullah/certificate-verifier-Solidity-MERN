const requiredRule = {
  required: true,
  message: 'This field is required!',
};

const urlRule = {
  //eslint-disable-next-line
  pattern: new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm),
  message: 'Invalid URL',
}

const emailRule = {
  //eslint-disable-next-line
  pattern: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/iu),
  message: 'Invalid Email',
}

const hexValueRule = {
  //eslint-disable-next-line
  pattern: new RegExp(/^#(?:[0-9a-fA-F]{3}){1,2}$/gm),
  message: 'Invalid Hex Value',
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
  },
  {
    label: 'Primary Color',
    name: 'primaryColor',
    rules: [hexValueRule]
  },
  {
    label: 'Secondary Color',
    name: 'secondaryColor',
    rules: [hexValueRule]
  }
];

export const findCertificateFields = [
  {
    label: 'Certificate uuid',
    name: 'uuid',
    rules: [requiredRule]
  }
];

export const userAuthFormFields = [
  {
    label: 'Email Address',
    name: 'email',
    rules: [requiredRule, emailRule],
    type: 'text'
  },
  {
    label: 'Password',
    name: 'password',
    rules: [requiredRule],
    type: 'password'
  }
];