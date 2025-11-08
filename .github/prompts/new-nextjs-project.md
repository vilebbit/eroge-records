---
mode: 'Plan Agent'
model: Claude Sonnet 4.5
description: 'Create a new Next.js project'
---

# Personal Game Record Website

## Primary Directive

Your goal is to create a new Next.js website, you help with tasks by giving clean, well-designed, error-free, fast, secure, readable, and maintainable code that follows Next.js and React conventions.

## Project Overview

This project is a personal web application that displays charts (or tables) of my game playing data, such as game name, totoal play time, play status, etc. It is built using Next.js with TypeScript support, and with Server Side Rendering and Cache Components enabled.
The website does not have the functionality to modify or add data, all it can do is display the data fetched from a remote server.
Note that some pages, components, and functions in this project have already been completed, in that case you should use them as examples for your work, and avoid modifying them if they are already able to meet the requirements.

## Implementation Details

### Data Fetching

Application fetches data from a remote CouchDB server and use the data to display contents. 
Fetching logic is written in `@/lib/db/query.ts` as async functions, and utilize the Next.js Cacha Components features to cache the response with `cacheLife("hours")`.

### Data Schema

The fetched data is an array of `GameDoc` objects, each object represents for a single game information. You can find the schema in `@/lib/db/documents.ts`

### Routes

This project contains 4 routes in general:

- `/`: The root page. You can leave this page empty because I haven't decided what to do with it.
- `/consent`: User consent page. Because our project contains NSFW contents, users must confirm they are eligible to view this type of contents in their region.
- `/statistics`: Play record statistics page. This page fetches an array of `GameDoc` from a remote server, and use the data to display 2 blocks. 
First, recently played games block. It maps the retrieved `GameDoc` array to a series of rectangles, each regtangle consists of the game cover image (`GameDoc.metadata.extra.["coverUrl"].value`), game title (`GameDoc.metadata.name`), and play status (`GameDoc.record.playStatus`). The cover image should be a link that directs to game official site (`GameDoc.metadata.relatedSites.["official"].url`).
Second, a horizontal bar chart that shows games played in the past year, sorted by playtime (`GameDoc.record.playTime`) desc. The x axis of the chart is playtime (h:mm), the y axis of the chart is the game title.
- `/overall`: Life time play record page. This page fetches an array of `GameDoc` from a remote server, and use the data to display a series of game rating score tables. It consists of 6 tables divided by scores: 10, 9~9.9, 8~8.9, 7~7.9, 6~6.9, under 5.9. Each table should have these columns: score (`GameDoc.record.score`), cover image (`GameDoc.metadata.extra.["coverUrl"].value`), title (`GameDoc.metadata.name`), brand (`GameDoc.metadata.developers`), play status (`GameDoc.record.playStatus`), playtime (`GameDoc.record.playTime`) (h:mm), last playtime (`GameDoc.record.playTime`) (yyyy-MM-dd). Rows are sorted by score desc and last playtime desc.

### Layout

The application should have a Navbar on the top. If user is using a desktop browser we display all available routes (except the `/consent` route) on it. If user is using a mobile browser, then put routes into a drawer, and display a burger on the left corner of the Navbar to control the drawer. 
On the right corner of the Navbar, there should be a theme switching button that allows users to switch between dark and light theme.
The other layout related design is not determined, you can let your imagination run wild and create whatever you want, just be sure to use a modern design pattern.

