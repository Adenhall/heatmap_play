# Heatmap Memory Game

A simple memory game using heatmap.

## Prequesites

Ensure that you have [Node.JS](https://nodejs.org/en) installed

## Run locally

It's as simple as doing this command in your terminal:

```bash
npm install # ensure you have the dependencies
npm run dev
```

## Troubleshooting/ Bugs

- Adjusting the screen size may cause the heatmap to shrink or be displaced. As
  the library heatmap.js sets the canvas (heatmap)'s fixed dimensions on the
  first render, changing to different screen sizes will not make the canvas
  responsive
