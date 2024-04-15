export const c = `
#include <stddef.h>
#include <stdio.h>
static const int values[] = { 1, 2, 4, 9, 15 };
#define ARRAYSIZE(x) (sizeof x/sizeof x[0])
int main (int argc, char *argv[])
{
    size_t i;
    for (i = 0; i < ARRAYSIZE(values); i++)
    {
        printf("%d ", values[i]);
    }

    return 0;
}`;

export const cpp = `
#include <iostream>
using namespace std;

int main() {

    int n;

    cout << "Enter a positive integer: ";
    cin >> n;

    // run a loop from 1 to 10
    // print the multiplication table
    for (int i = 1; i <= 10; ++i) {
        cout << n << " * " << i << " = " << n * i << endl;
    }

    return 0;
}
`;

export const csharp = `
// Stopwatch solution
using System;
using System.Diagnostics;

Stopwatch stopwatch = new Stopwatch();
stopwatch.Start();

// example snippet
var result = new List<(int, int)>();
foreach (int a in new[] { 1, 3, 5 })
{
    foreach (int b in new[] { 2, 4, 6 })
    {
        result.Add((a, b));
    }
}

stopwatch.Stop();
Console.WriteLine($"Elapsed time: {stopwatch.Elapsed}");

// BenchmarkDotNet solution
// Install the BenchmarkDotNet NuGet package to use this solution
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

public class MyBenchmark
{
    [Benchmark]
    public List<(int, int)> TestSnippet()
    {
        var result = new List<(int, int)>();
        foreach (int a in new[] { 1, 3, 5 })
        {
            foreach (int b in new[] { 2, 4, 6 })
            {
                result.Add((a, b));
            }
        }
        return result;
    }
}

public class Program
{
    public static void Main(string[] args)
    {
        var summary = BenchmarkRunner.Run<MyBenchmark>();
    }
}
`;

export const go = `
package main

import "testing"

func f(shouldPanic bool) string {
	if shouldPanic {
		panic("function panicked")
	}
	return "function didn't panic"
}

func Test_f(t *testing.T) {
	t.Run("panics", func(t *testing.T) {
		// If the function panics, recover() will
		// return a non nil value.
		defer func() {
			if r := recover(); r == nil {
				t.Errorf("function should panic")
			}
		}()

		f(true)
	})

	t.Run("does not panic", func(t *testing.T) {
		shouldPanic := false
		want := "function didn't panic"
		if got := f(shouldPanic); got != want {
			t.Errorf("f(%v) = %v, want %v", shouldPanic, got, want)
		}
	})

}
`;

export const java = `
import javax.mail.*;
import javax.mail.internet.*;
import java.util.*;

public void postMail( String recipients[ ], String subject, String message , String from) throws MessagingException
{
    boolean debug = false;

     //Set the host smtp address
     Properties props = new Properties();
     props.put("mail.smtp.host", "smtp.example.com");

    // create some properties and get the default Session
    Session session = Session.getDefaultInstance(props, null);
    session.setDebug(debug);

    // create a message
    Message msg = new MimeMessage(session);

    // set the from and to address
    InternetAddress addressFrom = new InternetAddress(from);
    msg.setFrom(addressFrom);

    InternetAddress[] addressTo = new InternetAddress[recipients.length];
    for (int i = 0; i < recipients.length; i++)
    {
        addressTo[i] = new InternetAddress(recipients[i]);
    }
    msg.setRecipients(Message.RecipientType.TO, addressTo);


    // Optional : You can also set your custom headers in the Email if you Want
    msg.addHeader("MyHeaderName", "myHeaderValue");

    // Setting the Subject and Content Type
    msg.setSubject(subject);
    msg.setContent(message, "text/plain");
    Transport.send(msg);
}
`;

export const javascript = `
console.log('Script start');

setTimeout(() => console.log('setTimeout()'), 0);

Promise.resolve()
  .then(() => console.log('Promise.then() #1'))
  .then(() => console.log('Promise.then() #2'));

console.log('Script end');

// LOGS:
//   Script start
//   Script end
//   Promise.then() #1
//   Promise.then() #2
//   setTimeout()
`;

export const kotlin = `
class Turtle {
    fun penDown()
    fun penUp()
    fun turn(degrees: Double)
    fun forward(pixels: Double)
}
val myTurtle = Turtle()
with(myTurtle) { //draw a 100 pix square
    penDown()
    for(i in 1..4) {
        forward(100.0)
        turn(90.0)
    }
    penUp()
}
`;

export const php = `
function recurseCopy($src, $dst)
{
    $dir = opendir($src);
    mkdir($dst);
    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                $this->recurseCopy($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file,$dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}
`;

export const python = `
def merge(*args, missing_val = None):
#missing_val will be used when one of the smaller lists is shorter tham the others.
#Get the maximum length within the smaller lists.
  max_length = max([len(lst) for lst in args])
  outList = []
  for i in range(max_length):
    result.append([args[k][i] if i < len(args[k]) else missing_val for k in range(len(args))])
  return outList
`;

export const ruby = `
# Getters 'get' stuff from your class
# Setters 'set' stuff in your class
class Product
  # Always Initialize It First
  def initialize( description, price)
    @id = rand(100...999)
    @description = description
    @price = price
  end

  # Create GETTER for our descrition
  def description
  	# don't need "return", but I like it
    return @description
  end

  # Create SETTER for our description...Setters use = and can be named after its getter
  def description=( description )
    @description = description
  end


  def to_s
    # return by rewriting to_s :-p and add tabs with \t
    return "#{@id}\t#{@description}\t#{@price}"
  end
end

# Set it up... Instantiate our class
book = Product.new( "Ruby On Rails For Web Development", 26.95 )
book2 = Product.new( "Intro To Ruby", 25.95 )

# Call the thing!
puts book
puts book2

# Call The Description Getter
puts book.description
# Call the Setter, set a different Description
puts book.description= "I Like Cheese!"
`;

export const rust = `
fn main() {
    let _immutable_binding = 1;
    let mut mutable_binding = 1;

    println!("Before mutation: {}", mutable_binding);

    // Ok
    mutable_binding += 1;

    println!("After mutation: {}", mutable_binding);

    // Error!
    _immutable_binding += 1;
    // FIXME ^ Comment out this line
}
`;

export const typescript = `
interface MyInterface {
    id: number;
    name: string;
    properties: string[];
  }

  const myObject: MyInterface = {
    id: 1,
    name: 'foo',
    properties: ['a', 'b', 'c']
  };

  function getValue(value: keyof MyInterface) {
    return myObject[value];
  }

  getValue('id'); // 1
  getValue('count')
`;

export const forLoop = `
for (int i = 0; i < 10; i++)
{
  System.out.println(i);
}
`;

export const _function = `
a = [1, 2, 3, 4];

def sumArr(arr):
  sum = 0
  for i in range(0, len(arr)):
    sum += arr[i]
  return sum

print(sumArr(a))
`;

export const object = `
public class Player {
  final static int MAX_CARDS = 52;                    // max number of cards in a hand

  private Card[] cards = new Card[MAX_CARDS];         // the cards
  private int N = 0;                                  // number of cards
  private String name;                                // player's name
  private int x, y;                                   // location to draw

  public Player(String name, int x, int y) {
      this.name = name;
      this.x = x;
      this.y = y;
  }

  public Card peak()         { return cards[0];   }    // return first card
  public void dealTo(Card c) { cards[N++] = c;    }    // insert card
  public void reset()        { N = 0;             }    // discard all cards

  // compute value of blackjack hand
  public int value() {
      int val = 0;
      boolean hasAce = false;
      for (int i = 0; i < N; i++) {
          val = val + cards[i].rank();
          if (cards[i].isAce()) hasAce = true;
      }
      if (hasAce && (val <= 11)) val = val + 10;          // handle ace = 1 or 11
      return val;
  }

  // draw the pile of cards, with the first one centered at (x, y)
  public void draw(Draw d) {
      for (int i = 0; i < N; i++)
          cards[i].draw(d, x + i*25, y);
  }

  // print out cards in player's hand (for debugging)
  public String toString() {
      String s = name + "  (" + value() + ")  ";
      for (int i = 0; i < N; i++)
          s += cards[i] + " ";
      return s;
  }

}
`;

export const ifStatement = `
const age = 14;

if (age < 13)
{
    console.log("PG");
}
else if (age < 18)
{
    console.log("PG13");
}
else
{
    console.log("R");
}
`;

export const recursion = `
function factorial(n)
{
    if (n == 1)
        return 1;
    else
        return n * factorial(n-1);
}

console.log(factorial(5));
`;

export const _import = `
import numpy as np

# Creating 5x4 array
array = np.arange(20).reshape(5, 4)
print(array)
print()

# If no axis mentioned, then it works on the entire array
print(np.argmax(array))

# If axis=1, then it works on each row
print(np.argmax(array, axis=1))

# If axis=0, then it works on each column
print(np.argmax(array, axis=0))
`;

export const countSubstr = (str, target) => {
  let count = 0
  let i = 0;

  while (true)
  {
    const r = str.indexOf(target, i);

    if (r !== -1)
    {
      count++;
      i = r+1;
    }
    else
    {
      return count;
    }
  }
};