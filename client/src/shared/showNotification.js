import { notification } from 'antd';

const showNotification = (type, content, apiError) => {
  let description = content;
  if (apiError) {
    description = content.response.data.error
  }

  notification[type.toLowerCase()]({
    type,
    message: type,
    description,
  });
};

export default showNotification;
