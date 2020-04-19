pragma solidity 0.6.1;

contract CertificateVerifier {
    struct Company {
        string name;
        string logoURL;
        string website;
    }
    
    struct Certificate {
        string candidateName;
        string position;
        string startDate;
        string endDate;
        address awarder;
    }
    
    mapping (address => Company) Companies;
    mapping (string => Certificate) Certificates;
    
    function registerCompany(string memory name, string memory  logoURL, string memory  website) public returns (string memory) {
        Companies[tx.origin] = Company(name, logoURL, website);
    }
    
    function getCompany(address companyAddress) public view returns (string memory) {
        return Companies[companyAddress].name;
    }
    
    function awardCertificate(string memory uuid, string memory name, string memory  position, string memory startDate, string memory  endDate) public {
        Certificates[uuid] = Certificate(name, position, startDate, endDate, tx.origin);
    }
    
    function getCertificate(string memory uuid) public view returns (string memory) {
        return Certificates[uuid].candidateName;
    }
}