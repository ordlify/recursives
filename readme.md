RecursiveImages Component
=========================

The `RecursiveImages` component is a custom web component that provides a way to render multiple ordinals recursively in a grid-like structure. It encapsulates the logic for generating a grid and rendering them on a canvas element.

Features
--------

*   Render inscriptions in a grid-like structure.
*   Automatic resizing of inscriptions to fit within grid cells.
*   Supports different grid configurations, including variable number of rows and columns.

Usage
-----

To use the `RecursiveImages` component in your HTML, you need to include the component's JavaScript file and use the custom element tag `<recursive-images></recursive-images>`. Here's an example:

```
<html lang="en"> 
  <head>   
    <meta charset="UTF-8">   
    <title>Recursive Images Demo</title>   
    <script src="recursive-images.js" type="text/javascript"></script> 
  </head> 
  <body>   
    <recursive-images 
      inscriptions="['/content/<INSCRIPTION_ID>', '/content/<INSCRIPTION_ID>', ...]"
      grid="3x3"
      originalWidth="800"
      originalHeight="600"></recursive-images> 
  </body> 
</html>
```

### Attributes

The `RecursiveImages` component accepts the following attributes:

*   `inscriptions` (required): A JSON-encoded array of inscription ids be rendered recursively example /content/<INSCRIPTION_ID>.
*   `grid` (required): The desired grid configuration for the images. It takes the format `rowxcolumn` (2x2).
*   `width` (required): The width of the image in pixels.
*   `height` (required): The height of the image in pixels.


Compatibility
-------------

The `RecursiveImages` component is built using native web technologies and utilizes the Custom Elements API, Shadow DOM, and Canvas API. It is compatible with modern browsers that support these features.

Contribution
------------

Contributions to the `RecursiveImages` component are welcome! If you have any suggestions, improvements, or bug fixes, please feel free to submit a pull request.

License
-------

The `RecursiveImages` component is open-source and released under the [MIT License](https://opensource.org/licenses/MIT).
