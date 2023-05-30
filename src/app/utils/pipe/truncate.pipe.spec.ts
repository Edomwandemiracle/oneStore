import { TruncatePipe } from "./truncate.pipe";



describe('Truncate Pipe', ()=> {
    let pipe: TruncatePipe;

    beforeEach(()=> {
        pipe = new TruncatePipe();
    })

    it('should be created', ()=>{
        expect(pipe).toBeTruthy();
    })

    it('should return the same value if limit is greater than the string length', ()=> {
        const value = 'test'
        const result = pipe.transform(value, 5);
        expect(result).toEqual('test');
    })

    it('should return the same value if limit is equal to the string length', ()=> {
        const value = 'test'
        const result = pipe.transform(value, 4);
        expect(result).toEqual('test');
    })

    it('should truncate a string and append custom ellipsis', () => {
        const value = 'This is a long string that needs to be truncated';
        const result = pipe.transform(value, 10, false, '***');
    
        expect(result).toEqual('This is a ***');
      });

      it('should truncate a string with complete words', () => {
        const value = 'This is a long string that needs to be truncated';
        const result = pipe.transform(value, 18, true);
    
        expect(result).toEqual('This is a long...');
      });
})

