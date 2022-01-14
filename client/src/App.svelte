<script>
  import Modal from './Modal.svelte';
	import { time, elapsed } from './stores.js';

  let showModal = false;

  const toggleModal = () => {
    showModal = !showModal;
  };

	const formatter = new Intl.DateTimeFormat('en', {
		hour12: true,
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit'
	});
</script>

<Modal {showModal} on:click={toggleModal}>
  <form>
    <input type="text" placeholder="name" />
    <input type="text" placeholder="hair color" />
    <button>Add Person</button>
  </form>
  <div slot="title">
    <h3>Add a new person</h3>
  </div>
</Modal>
<button on:click={toggleModal}>Open Modal</button>
<h1>The time is {formatter.format($time)}</h1>

<p>
	This page has been open for
	{$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}
</p>


<style>
  
</style>