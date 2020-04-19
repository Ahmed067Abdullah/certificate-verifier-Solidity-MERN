pragma solidity 0.6.1;

contract CertificateVerifier {
    struct Company {
        string name;
        string logoURL;
        string website;
        bool isSet;
    }
    
    struct Certificate {
        string candidateName;
        string position;
        string startDate;
        string endDate;
        address awarder;
        bool isSet;
    }
    
    mapping (address => Company) Companies;
    mapping (string => Certificate) Certificates;
    
    function registerCompany(string memory name, string memory  logoURL, string memory  website) public returns (string memory) {
        require(!Companies[tx.origin].isSet, "Address already in use");
        Companies[tx.origin] = Company(name, logoURL, website, true);
    }
    
    function getCompany(address companyAddress) public view returns (string memory) {
        return Companies[companyAddress].name;
    }
    
    function awardCertificate(string memory uuid, string memory name, string memory  position, string memory startDate, string memory  endDate) public {
        require(Companies[tx.origin].isSet, "Organization isn't registered");
        require(!Certificates[uuid].isSet, 'Certificate ID already used');
        Certificates[uuid] = Certificate(name, position, startDate, endDate, tx.origin, true);
    }
    
    function getCertificate(string memory uuid) public view returns (string memory) {
        return Certificates[uuid].candidateName;
    }
}