import { Icon } from '@elysium/uikit';

export default () => { 
  return (
    <form>
      <fieldset id="forms__progress">
        <legend>
          <Icon type="activity" size={12} />
          Progress
        </legend>
        <p>
          <meter value="69" min="0" max="100">
            69 out of 100
          </meter>
        </p>
        <p>
          <progress>progress</progress>
        </p>
      </fieldset>

      <fieldset id="forms__input">
        <legend>Input fields</legend>
        <p>
          <label htmlFor="input__text">Text Input</label>
          <input id="input__text" type="text" placeholder="Text Input" />
        </p>
        <p>
          <label htmlFor="input__password">Password</label>
          <input id="input__password" type="password" placeholder="Type your Password" />
        </p>
        <p>
          <label htmlFor="input__webaddress">Web Address</label>
          <input id="input__webaddress" type="url" placeholder="https://yoursite.com" />
        </p>
        <p>
          <label htmlFor="input__emailaddress">Email Address</label>
          <input id="input__emailaddress" type="email" placeholder="name@email.com" />
        </p>
        <p>
          <label htmlFor="input__phone">Phone Number</label>
          <input id="input__phone" type="tel" placeholder="(999) 999-9999" />
        </p>
        <p>
          <label htmlFor="input__search">Search</label>
          <input id="input__search" type="search" placeholder="Enter Search Term" />
        </p>
        <p>
          <label htmlFor="input__text2">Number Input</label>
          <input id="input__text2" type="number" placeholder="Enter a Number" />
        </p>
        <p>
          <label htmlFor="input__file">File Input</label>
          <input id="input__file" type="file" />
        </p>
      </fieldset>

      <fieldset id="forms__select">
        <legend>Select menus</legend>
        <p>
          <label htmlFor="select">Select</label>
          <select id="select">
            <optgroup label="Option Group">
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
            </optgroup>
          </select>
        </p>
        <p>
          <label htmlFor="select_multiple">Select (multiple)</label>
          <select id="select_multiple" multiple>
            <optgroup label="Option Group">
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
            </optgroup>
          </select>
        </p>
      </fieldset>

      <fieldset id="forms__checkbox">
        <legend>Checkboxes</legend>
        <ul>
          <li>
            <label htmlFor="checkbox1">
              <input id="checkbox1" name="checkbox" type="checkbox" checked /> Choice A
            </label>
          </li>
          <li>
            <label htmlFor="checkbox2">
              <input id="checkbox2" name="checkbox" type="checkbox" /> Choice B
            </label>
          </li>
          <li>
            <label htmlFor="checkbox3">
              <input id="checkbox3" name="checkbox" type="checkbox" /> Choice C
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset id="forms__radio">
        <legend>Radio buttons</legend>
        <ul>
          <li>
            <label htmlFor="radio1">
              <input id="radio1" name="radio" type="radio" checked /> Option 1
            </label>
          </li>
          <li>
            <label htmlFor="radio2">
              <input id="radio2" name="radio" type="radio" /> Option 2
            </label>
          </li>
          <li>
            <label htmlFor="radio3">
              <input id="radio3" name="radio" type="radio" /> Option 3
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset id="forms__textareas">
        <legend>Textareas</legend>
        <p>
          <label htmlFor="textarea">Textarea</label>
          <textarea id="textarea" rows={8} cols={48} placeholder="Enter your message here"></textarea>
        </p>
      </fieldset>

      <fieldset id="forms__html5">
        <legend>HTML5 inputs</legend>
        <p>
          <label htmlFor="ic">Color input</label>
          <input type="color" id="ic" value="#000000" />
        </p>
        <p>
          <label htmlFor="in">Number input</label>
          <input type="number" id="in" min="0" max="10" value="5" />
        </p>
        <p>
          <label htmlFor="ir">Range input</label>
          <input
            type="range"
            id="ir"
            max={100}
          />
        </p>
        <p>
          <label htmlFor="idd">Date input</label>
          <input type="date" id="idd" value="1970-01-01" />
        </p>
        <p>
          <label htmlFor="idm">Month input</label>
          <input type="month" id="idm" value="1970-01" />
        </p>
        <p>
          <label htmlFor="idw">Week input</label>
          <input type="week" id="idw" value="1970-W01" />
        </p>
        <p>
          <label htmlFor="idt">Datetime input</label>
          <input type="datetime" id="idt" value="1970-01-01T00:00:00Z" />
        </p>
        <p>
          <label htmlFor="idtl">Datetime-local input</label>
          <input type="datetime-local" id="idtl" value="1970-01-01T00:00" />
        </p>
        <p>
          <label htmlFor="idl">Datalist</label>
          <input type="text" id="idl" list="example-list" />
          <datalist id="example-list">
            <option value="Example #1" />
            <option value="Example #2" />
            <option value="Example #3" />
          </datalist>
        </p>
      </fieldset>

      <fieldset id="forms__action">
        <legend>Action buttons</legend>
        <p>
          <input type="submit" value="<input type=submit>" />
          <input type="button" value="<input type=button>" />
          <input type="reset" value="<input type=reset>" />
          <input type="submit" value="<input disabled>" disabled />
        </p>
        <p>
          <button type="submit">&lt;button type=submit&gt;</button>
          <button type="button">&lt;button type=button&gt;</button>
          <button type="reset">&lt;button type=reset&gt;</button>
          <button type="button" disabled>
            &lt;button disabled&gt;
          </button>
        </p>
      </fieldset>
      <fieldset id="forms__progress">
        <p>Empty fieldset</p>
      </fieldset>
    </form>
  );
}
