export class Position
{
    public x = 0;
    public y = 0;
}

export class Velocity
{
    public x = 0;
    public y = 0;
}

export class Offset
{
    public x = 0;
    public y = 0;
}

export class AttackBox
{
    public position?: Position;
    public offset?: Offset;
    public width?: number;
    public height?: number;
}