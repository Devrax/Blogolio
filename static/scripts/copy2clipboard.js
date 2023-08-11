document.querySelectorAll('.highlight').forEach(el => {
   const play = new Audio('/sounds/click.wav'),
   button = document.createElement('button');
   button.textContent = '📋';
   button.className = 'copy-button';

   button.addEventListener('click', async () => {
      await play.play();
      await navigator.clipboard.writeText(el.textContent);
      button.textContent = '✅';
      setTimeout(() => {
         button.textContent = '📋'
      }, 3000);

   });

   el.appendChild(button);

});