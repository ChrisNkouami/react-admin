import * as React from 'react';
import expect from 'expect';
import { render, cleanup } from '@testing-library/react';
import EmailField from './EmailField';

const url = 'foo@bar.com';

describe('<EmailField />', () => {
    afterEach(cleanup);

    it('should render as Mui Link', () => {
        const record = { foo: url };
        const { getByText } = render(
            <EmailField record={record} source="foo" />
        );
        const link = getByText(url);
        expect(link.tagName).toEqual('A');
        expect(link.href).toEqual(`mailto:${url}`);
        expect(link.innerHTML).toEqual(url);
    });

    it('should handle deep fields', () => {
        const record = { foo: { bar: url } };
        const { getByText } = render(
            <EmailField record={record} source="foo.bar" />
        );
        const link = getByText(url);
        expect(link.tagName).toEqual('A');
        expect(link.href).toEqual(`mailto:${url}`);
        expect(link.innerHTML).toEqual(url);
    });

    it('should display an email (mailto) link', () => {
        const halUrl = 'hal@kubrickcorp.com';
        const record = { email: halUrl };
        const { getByText } = render(
            <EmailField record={record} source="email" />
        );
        const link = getByText(halUrl);
        expect(link.tagName).toEqual('A');
        expect(link.href).toEqual(`mailto:${halUrl}`);
        expect(link.innerHTML).toEqual(halUrl);
    });

    it('should use custom className', () => {
        const { getByText } = render(
            <EmailField
                record={{ email: url }}
                source="email"
                className="foo"
            />
        );
        const link = getByText(url);
        expect(link.className).toContain('foo');
    });

    it.each([null, undefined])(
        'should render the emptyText when value is %s',
        foo => {
            const { queryByText } = render(
                <EmailField record={{ foo }} source="foo" emptyText="NA" />
            );
            expect(queryByText('NA')).not.toBeNull();
        }
    );

    it('should return null when the record has no value for the source and no emptyText', () => {
        const { container } = render(<EmailField record={{}} source="foo" />);
        expect(container.firstChild).toBeNull();
    });
});
