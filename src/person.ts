class Person {
    name: string = "Serkan";
    surname: string = "Zengin";

    year: number = new Date().getFullYear();

    serkan = (year: number): string => { return (this.year * 2).toString(); };
}

class ErrorMessage {
    errorMessage: string = "Error occurred";
}

export let person = new Person();
export let errorMessage = new ErrorMessage();