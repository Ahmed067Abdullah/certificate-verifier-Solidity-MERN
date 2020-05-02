const styleSheet = (primary = "#24C4D4", secondary = "gold") => {
  return {
    'certificate-container': {
      border: `10px solid ${primary}`,
      maxWidth: '695px',
      width: '95vw',
      minWidth: '300px',
      padding: '40px 40px 30px',
      position: 'relative',
      margin: 'auto'
    },
    'styled-div': {
      '& > img': {
        width: "74%",
        marginTop: "10px"
      },
      backgroundColor: primary,
      width: '80px',
      height: '150px',
      position: 'absolute',
      top: '0',
      left: '30px',
      clipPath: 'polygon(100% 0, 100% 100%, 50% 75%, 0 100%, 0 0)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    'main-content': {
      textAlign: "center",
      width: "80%",
      margin: "auto"
    },
    "main-heading": {
      "& > span": {
        display: "block",
        fontSize: "48px",
        fontWeight: "500"
      },
      color: primary,
      fontSize: "24px",
      marginBottom: "40px"
    },
    'certificate-text': {
      '& .name': {
        color: primary,
        display: "block",
        fontSize: "64px",
        width: "fit-content",
        borderBottom: `1px solid ${secondary}`,
        margin: "0 auto 10px",
        padding: "0 20px"
      },
      '& > span': {
        "fontWeight": "500"
      },
      color: secondary,
      fontSize: "24px"
    },
    'certificate-footer': {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#4e4e4e",
      fontSize: "20px",
      width: "90%",
      margin: "50px auto 0"
    },
    'issuer': {
      margin: "0",
      fontWeight: "500"
    },
    'issuer-designation': {
      margin: "0"
    },
    'certificate-uuid': {
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "300",
      marginBottom: "-20px"
    }
  }
};

export default styleSheet;
