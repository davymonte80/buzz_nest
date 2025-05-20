import React from "react";
import Link from "next/link";
function About() {
  return (
    <div>
      <div className="max-w: 3xl mx-auto mt-3 mb-2 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">
          About Buzz Nest
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
          Welcome to{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            <Link href="/">Buzz Nest</Link>
          </span>{" "}
          — your one-stop destination for the latest news, trends, and insights
          across technology, gadgets, apps, travel, finance, parenting, health,
          food, and lifestyle.
        </p>
        <div className="space-y-4 text-gray-800 dark:text-gray-100">
          <p>
            At <span className="font-semibold">Buzz Nest</span>, we are
            passionate about delivering fresh, reliable, and engaging content to
            keep you informed and inspired. Whether you’re a tech enthusiast, a
            foodie, a parent, or someone looking to stay ahead of the curve, our
            curated articles and guides are tailored just for you.
          </p>
          <p>
            Our team of dedicated writers and editors work tirelessly to bring
            you the latest updates, in-depth reviews, and practical tips to help
            you navigate the fast-paced world around you.
          </p>
          <p>
            Thank you for being a part of our community. We hope you enjoy
            exploring Buzz Nest as much as we enjoy creating it for you!
          </p>
        </div>
        <div className="mt-8 text-center">
          <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition">
            Stay Curious. Stay Buzzed.
          </span>
        </div>
      </div>
    </div>
  );
}

export default About;
