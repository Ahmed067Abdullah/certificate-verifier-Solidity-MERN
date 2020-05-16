pragma solidity 0.6.1;

contract CertificateVerifier {
    struct Company {
        string name;
        string logoURL;
        string website;
        string primaryColor;
        string secondaryColor;
        bool isSet;
    }
    
    struct Certificate {
        string candidateName;
        string position;
        string startDate;
        string endDate;
        address awarder;
        string awarderName;
        string awarderDesignation;
        bool isSet;
    }
    
    mapping (address => Company) Companies;
    mapping (string => Certificate) Certificates;
    
    function registerCompany(string memory name, string memory  logoURL, string memory  website, string memory  primaryColor, string memory  secondaryColor) public returns (string memory) {
        require(!Companies[tx.origin].isSet, "Address already in use");
        Companies[tx.origin] = Company(name, logoURL, website, primaryColor, secondaryColor, true);
    }
    
    function getCompany(address companyAddress) public view returns (string memory, string memory, string memory, string memory, string memory) {
        return (
            Companies[companyAddress].name,
            Companies[companyAddress].logoURL, 
            Companies[companyAddress].website,
            Companies[companyAddress].primaryColor,
            Companies[companyAddress].secondaryColor
        );
    }
    
    function awardCertificate(string memory uuid, string memory name, string memory  position, string memory startDate, string memory  endDate, string memory  awarderName, string memory  awarderDesignation) public {
        require(Companies[tx.origin].isSet, "Organization isn't registered");
        require(!Certificates[uuid].isSet, 'Certificate ID already used');
        Certificates[uuid] = Certificate(name, position, startDate, endDate, tx.origin, awarderName, awarderDesignation,true);
    }
    
    function getCertificate(string memory uuid) public view returns (string memory, string memory, string memory, string memory, address, string memory, string memory) {
        return (
            Certificates[uuid].candidateName,
            Certificates[uuid].position,
            Certificates[uuid].startDate,
            Certificates[uuid].endDate,
            Certificates[uuid].awarder,
            Certificates[uuid].awarderName,
            Certificates[uuid].awarderDesignation
        );
    }
}