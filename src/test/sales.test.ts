import chai from "chai";
import request from "supertest";
import app from "../app.js";

chai.should();

describe("Insert Record", () => {
  it("POST /sales/record - Upload empty file", async () => {
    const res = await request(app).post("/sales/record").send().expect(400);

    res.body.errors.should.equal("No file found");
  });

  it("POST /sales/record - Upload file without attach anything", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "")
      .expect(400);

    res.body.errors.should.equal("No file found");
  });

  it("POST /sales/record - Upload file with invalid fileType", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/example.png")
      .expect(400);

    res.body.errors.should.equal("Invalid file type");
  });

  it("POST /sales/record - Upload CSV with invalid row length", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample1.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal(
      "Invalid Record Length: expect 6, got 4 on line 3"
    );
  });

  it("POST /sales/record - Upload CSV with invalid field (USER_NAME empty string)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample2.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid username on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (AGE not number)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample3.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid age on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (AGE empty)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample4.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid age on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (HEIGHT not number)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample5.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid height on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (HEIGHT empty)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample6.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid height on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (Gender invalid text)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample7.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid gender on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (Gender empty)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample8.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid gender on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (Sale amount not number)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample9.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid sale amount on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (Sale amount empty)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample10.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid sale amount on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (Last purchase date not date)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample11.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid last purchase date on line 3");
  });

  it("POST /sales/record - Upload CSV with invalid field (Last purchase date empty)", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample12.csv")
      .expect(500);

    res.body.errors[0].msg.should.equal("Invalid last purchase date on line 3");
  });

  it("POST /sales/record - Upload valid CSV", async () => {
    const res = await request(app)
      .post("/sales/record")
      .attach("file", "mock_data/sample.csv")
      .expect(200);

    res.text.should.equal("CSV Data Inserted");
  });
});

describe("Retrieve Report", () => {
  it("POST /sales/report - without from date", async () => {
    const res = await request(app).post("/sales/report").expect(400);

    res.body.errors.errors[0].msg.should.equal("Invalid From Date");
  });

  it("POST /sales/report - invalid from date", async () => {
    const res = await request(app)
      .post("/sales/report")
      .send({
        from: "ABC",
      })
      .expect(400);

    res.body.errors.errors[0].msg.should.equal("Invalid From Date");
  });

  it("POST /sales/report - valid date", async () => {
    const res = await request(app)
      .post("/sales/report")
      .send({
        from: "2020-11-04",
      })
      .expect(200);

    //it should be 2 records according to sample.csv
    res.body.length.should.equal(2);
  });

  it("POST /sales/report - without to date (empty string)", async () => {
    const res = await request(app)
      .post("/sales/report")
      .send({
        from: "2020-11-04",
        to: "",
      })
      .expect(200);

    // it still return data cause (to date) is nullable :)
    //it should be 2 records according to sample.csv
    res.body.length.should.equal(2);
  });

  it("POST /sales/report - invalid to date", async () => {
    const res = await request(app)
      .post("/sales/report")
      .send({
        from: "2020-11-04",
        to: "ABC",
      })
      .expect(400);

    res.body.errors.errors[0].msg.should.equal("Invalid To Date");
  });

  it("POST /sales/report - valid date range", async () => {
    const res = await request(app)
      .post("/sales/report")
      .send({
        from: "2022-01-01",
        to: "2022-12-30",
      })
      .expect(200);
    //it should be 1 record according to sample.csv
    res.body.length.should.equal(1);

    res.body[0].USER_NAME.should.equal("Steve Kwok");
  });
});
