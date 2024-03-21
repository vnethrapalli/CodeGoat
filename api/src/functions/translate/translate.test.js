import { mockHttpEvent } from '@redwoodjs/testing/api'
import { handler } from './translate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

describe('code, input, and output is required',  () => {
  it('requires code', async () => {
    const httpEvent = mockHttpEvent({
      method: "POST",
      body: JSON.stringify({
        inputLanguage: "python",
        outputLanguage: "javascript"
      })
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.data).toEqual('please provide all three of code, input language, and output language')
  });

  it('requires input language', async () => {
    const httpEvent = mockHttpEvent({
      method: "POST",
      body: JSON.stringify({
        code: "print('hello world!')",
        outputLanguage: "javascript"
      })
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.data).toEqual('please provide all three of code, input language, and output language')
  });

  it('requires output language', async () => {
    const httpEvent = mockHttpEvent({
      method: "POST",
      body: JSON.stringify({
        code: "print('hello world!')",
        inputLanguage: 'python',
      })
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.data).toEqual('please provide all three of code, input language, and output language')
  });
});

// describe('language detection errors',  () => {
//   it('>=500 chars and selected language and detected language are different', async () => {
//     const httpEvent = mockHttpEvent({
//       method: "POST",
//       body: JSON.stringify({
//         inputLanguage: 'python',
//         outputLanguage: 'javascript',
//         code: `
//           public class OracleJdbcTest
//           {
//             String driverClass = "oracle.jdbc.driver.OracleDriver";

//             Connection con;

//             public void init(FileInputStream fs) throws ClassNotFoundException, SQLException, FileNotFoundException, IOException
//             {
//               Properties props = new Properties();
//               props.load(fs);
//               String url = props.getProperty("db.url");
//               String userName = props.getProperty("db.user");
//               String password = props.getProperty("db.password");
//               Class.forName(driverClass);

//               con=DriverManager.getConnection(url, userName, password);
//             }

//             public void fetch() throws SQLException, IOException
//             {
//               PreparedStatement ps = con.prepareStatement("select SYSDATE from dual");
//               ResultSet rs = ps.executeQuery();

//               while (rs.next())
//               {
//                 // do the thing you do
//               }
//               rs.close();
//               ps.close();
//             }

//             public static void main(String[] args)
//             {
//               OracleJdbcTest test = new OracleJdbcTest();
//               test.init();
//               test.fetch();
//             }
//           }
//         `
//       }),
//     });

//     const result = await handler(httpEvent);
//     const body = result.body;

//     expect(result.statusCode).toBe(400);
//     expect(body.data).toEqual("Please select the right language for your code.");
//   });

//   it('>=500 chars and selected language and detected language are the same', async () => {
//     const httpEvent = mockHttpEvent({
//       method: "POST",
//       body: JSON.stringify({
//         inputLanguage: 'java',
//         outputLanguage: 'javascript',
//         code: `
//           public class OracleJdbcTest
//           {
//             String driverClass = "oracle.jdbc.driver.OracleDriver";

//             Connection con;

//             public void init(FileInputStream fs) throws ClassNotFoundException, SQLException, FileNotFoundException, IOException
//             {
//               Properties props = new Properties();
//               props.load(fs);
//               String url = props.getProperty("db.url");
//               String userName = props.getProperty("db.user");
//               String password = props.getProperty("db.password");
//               Class.forName(driverClass);

//               con=DriverManager.getConnection(url, userName, password);
//             }

//             public void fetch() throws SQLException, IOException
//             {
//               PreparedStatement ps = con.prepareStatement("select SYSDATE from dual");
//               ResultSet rs = ps.executeQuery();

//               while (rs.next())
//               {
//                 // do the thing you do
//               }
//               rs.close();
//               ps.close();
//             }

//             public static void main(String[] args)
//             {
//               OracleJdbcTest test = new OracleJdbcTest();
//               test.init();
//               test.fetch();
//             }
//           }
//         `
//       }),
//     });

//     const result = await handler(httpEvent);
//     const body = result.body;

//     expect(result.statusCode).toBe(200);
//   });

//   it('<500 chars, language discrepancy should be ignored', async () => {
//     const httpEvent = mockHttpEvent({
//       method: "POST",
//       body: JSON.stringify({
//         inputLanguage: 'javascript',
//         outputLanguage: 'python',
//         code: `
//         def add(a, b):
//           return a + b
//         print(add(1, 2))
//         `
//       }),
//     })

//     const result = await handler(httpEvent);
//     const body = result.body;

//     expect(result.statusCode).toBe(200);
//   });
// });