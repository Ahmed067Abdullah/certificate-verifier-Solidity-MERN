# Problem:
Whenever an employee leaves an organization or a student completes a course/bootcamp, a certificate is awarded to them. These certificates are usually awarded in the form of Hard Copy (on paper) and there is no way to check their authenticity. Such certificates are helpful in job search and creating resume BUT they can be forged easily.

# Solution:
To deal with the above mentioned issue, We can maintain a decentralized record of the certificates. To do that, at first the company/organization would have to register themselves using an ethereum address. The organization would also have to show their ethereum address on their official website so that it can be verified that a particular address belongs to a particular company. Once a company/organization is registered, they can start awarding the certificates to the candidates by submitting a simple form. All this data would be stored on ethereum blockchain in order to achieve immutability and verifiability.

# Technology Stack:
1. **Solidity** is used for smart contract development.
2. For frontend of the application, the famous UI library of JS, i.e **React** is used.
3. Backend server for user authentication and storing metadata of certificates is written in **Node**.
4. The No SQL database **MongoDB Atlas** is used for data persistance.

# To run locally:
1. clone the repository.
2. In the root directory, execute
   1. ```npm run install-all```.
   2. ```npm run dev```.
   
# Demo
Click [here](http://certificate-verifier.herokuapp.com/home)

# To run application without dependency of Metamask
Next JS version can be found [here](https://github.com/Ahmed067Abdullah/certificate-verifier-NextJS)
