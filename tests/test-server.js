var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../server');
var should = chai.should();
var assert = chai.assert;

var employee = require('../employees/employee');

chai.use(chaiHttp);

// Clear the employee db after each unit test
afterEach(function(done){
    employee.collection.drop();
    done();
});

it('employee.createEntry() should create a new document in the mongodb database', function(done) {
    var req = {};
    req.firstName = "Noah";
    req.lastName = "Frank";
    req.position = "SE";
    req.department = "Software Development";
    req.streetAddress = "53 Tucan Lane";
    req.city = "Rochester";
    req.state = "New York";
    req.zipCode = 14623;
    req.gender = "Male";
    req.DOB = "1995-05-18";
    req.phone = "124-321-5234";
    req.salary = 100000;

    chai.request(server)
        .post('/createEmployee')
        .send(req)
        .end(function(err, res) {
            res.should.have.status(200);
            employee.findOne({ 'firstName': req.firstName, 'lastName': req.lastName }, function (err, emp) {
                if (err) assert(false, "Error trying to find the inserted employee: " + err);
                if (emp == null) {
                    assert(false, "Could not find the inserted employee");
                } else {
                    assert.equal(req.firstName, emp.firstName);
                    assert.equal(req.lastName, emp.lastName);
                    assert.equal(req.position, emp.position);
                    assert.equal(req.department, emp.department);
                    assert.equal(req.street, emp.street);
                    assert.equal(req.city, emp.city);
                    assert.equal(req.state, emp.state);
                    assert.equal(req.zipcode, emp.zipcode);
                    assert.equal(req.gender, emp.gender);
                    assert.equal(req.dob, emp.dob);
                    assert.equal(req.phone, emp.phone);
                    assert.equal(req.salary, emp.salary);
                }
                done();
            })
        });
});