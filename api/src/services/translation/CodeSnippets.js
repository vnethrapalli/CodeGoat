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

import (
	"fmt"
	"strings"
)

func Example() {
	// Create a slice of the strings that you want to join together
	strs := []string{"aa", "bb", "cc"}
	//Use the strings.Join function to join them, by passing the desired separator
	fmt.Println(strings.Join(strs, "-"))
	fmt.Println(strings.Join(strs, ", "))
	fmt.Println(strings.Join(strs, ""))
	// Output:
	// aa-bb-cc
	// aa, bb, cc
	// aabbcc
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
$zip = new ZipArchive;
$file = $zip->open('file.zip');
if ($file) {
	$zip->extractTo('/extract_path/');
	$zip->close();
	echo 'Archive extracted successfully!';
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