Podemos Crear gradientes sobre imágenes. Para ello utilizaremos la propiedad linear-gradient, con su angulo y colores de origen y destino.

´´´html
   #imGradient {
            /* los siguientes son informativos no funcionan */
            background: url(https://webdevetc.com/images/tutorials/e_background.jpg);
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 80%, rgba(0, 0, 0, 0.9));
            
            background: linear-gradient(180deg, rgba(255, 255, 255, 0) 80%, rgba(0, 0, 0, 0.9)),url(https://webdevetc.com/images/tutorials/e_background.jpg);
            
            height: 400px;
            width: 400px;
            background-size:cover;
            border: 1px solid black;
    }

    <div id="imGradient"></div>
´´´
