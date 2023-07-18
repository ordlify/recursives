class RecursiveImages extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.canvas = document.createElement('canvas');
    this.shadow.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this._inscriptions = [];
    this._gridArrays = [];
    this._gridRows;
    this._gridColumns;
    this._width;
    this._height;
  }

  connectedCallback() {
    this._inscriptions = JSON.parse(this.getAttribute('inscriptions'));
    this._gridRows = parseInt(this.getAttribute('grid').split('x')[0]);
    this._gridColumns = parseInt(this.getAttribute('grid').split('x')[1]);
    this._width = parseInt(this.getAttribute('width'));
    this._height = parseInt(this.getAttribute('height'));
    this.canvas.width = this._width;
    this.canvas.height = this._height;

    this._gridArrays = this.generateGridArray(this._inscriptions.length, this._gridRows, this._gridColumns);

    this.render();
  }

  async render() {
    const imgWidth = this._width;
    const imgHeight = this._height;

    const sliceWidth = Math.round(imgWidth / this._gridRows);
    const sliceHeight = Math.round(imgHeight / this._gridColumns);

    const widthLastColumn = imgWidth - sliceWidth * (this._gridRows - 1);
    const heightLastRow = imgHeight - sliceHeight * (this._gridColumns - 1);

    const imagePromises = this._inscriptions.map((inscription) => this.createImageFromBase64(inscription));
    const images = await Promise.all(imagePromises);

    for (let g = 0; g < this._gridArrays.length; g++) {
      for (let c = 0; c < this._gridArrays[g].length; c++) {
        const img = images[this._gridArrays[g][c]];
        const x = c * sliceWidth;
        const y = g * sliceHeight;
        const w = c === this._gridRows - 1 ? widthLastColumn : sliceWidth;
        const h = g === this._gridColumns - 1 ? heightLastRow : sliceHeight;
        this.ctx.drawImage(img, x, y, w, h);
      }
    }
  }

  async createImageFromBase64(base64) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = base64;
    });
  }

  generateGridArray(length, gridRows, gridColumns) {
    const multiDimensionalArray = [];
    let element = 0;

    for (let row = 0; row < gridRows; row++) {
      const currentRow = [];

      for (let col = 0; col < gridColumns; col++) {
        currentRow.push(element);
        element = (element + 1) % length;
      }

      multiDimensionalArray.push(currentRow);
    }

    return multiDimensionalArray;
  }
}

customElements.define('recursive-images', RecursiveImages);