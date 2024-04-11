import { mockHttpEvent } from '@redwoodjs/testing/api'
import { handler } from './translate'
import { go } from './CodeSnippets';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-functions

const SECONDS = 1000;

const mockCreate = jest.fn().mockImplementationOnce(async () => {
  return {
    choices: [{ message: { "content" : "This is a sample response!" } }]
  }
})
.mockImplementationOnce(async () => {
  return {
    choices: [{ message: { "content" : "This is a sample response!" } }]
  }
});

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: mockCreate
        }
      }
    };
  });
});

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

describe('language detection errors',  () => {
  it('selected language and detected language are different, large code snippet', async () => {
    const httpEvent = mockHttpEvent({
      method: "POST",
      body: JSON.stringify({
        inputLanguage: 'python',
        outputLanguage: 'javascript',
        code: `
          public class OracleJdbcTest
          {
            String driverClass = "oracle.jdbc.driver.OracleDriver";

            Connection con;

            public void init(FileInputStream fs) throws ClassNotFoundException, SQLException, FileNotFoundException, IOException
            {
              Properties props = new Properties();
              props.load(fs);
              String url = props.getProperty("db.url");
              String userName = props.getProperty("db.user");
              String password = props.getProperty("db.password");
              Class.forName(driverClass);

              con=DriverManager.getConnection(url, userName, password);
            }

            public void fetch() throws SQLException, IOException
            {
              PreparedStatement ps = con.prepareStatement("select SYSDATE from dual");
              ResultSet rs = ps.executeQuery();

              while (rs.next())
              {
                // do the thing you do
              }
              rs.close();
              ps.close();
            }

            public static void main(String[] args)
            {
              OracleJdbcTest test = new OracleJdbcTest();
              test.init();
              test.fetch();
            }
          }
        `
      }),
    });

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.data).toEqual("java was detected but you selected python. Please select the right language.");
  });

  it('selected language and detected language are detected to be different, small code snippet', async () => {
    const httpEvent = mockHttpEvent({
      method: "POST",
      body: JSON.stringify({
        inputLanguage: 'python',
        outputLanguage: 'javascript',
        code: `print("hello world")`
      }),
    });

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(200);
  });
});

describe('empty code errors',  () => {
  it('code is comments only', async () => {
    const httpEvent = mockHttpEvent({
      method: "POST",
      body: JSON.stringify({
        code: "\r\n   \r\n\t\t\t\r\n",
        inputLanguage: "java",
        outputLanguage: "javascript"
      })
    })

    const result = await handler(httpEvent);
    const body = result.body;

    expect(result.statusCode).toBe(400);
    expect(body.data).toEqual("Code is empty or consists of comments only. Please provide some non-empty code.");
  });
});

describe('detection for variety of structures/languages', () => {
  const outputLanguage = "python";

  it('Go', async () => {

  }, SECONDS * 60);

  it('PHP', async () => {

  });

  it('Ruby', async () => {

  });

  it('Kotlin', async () => {

  });
});