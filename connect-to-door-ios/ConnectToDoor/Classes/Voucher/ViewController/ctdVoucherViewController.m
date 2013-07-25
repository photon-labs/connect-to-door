//
//  ctdVoucherViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdVoucherViewController.h"
#import "ctdReimbursementViewController.h"

@interface ctdVoucherViewController ()

@end

@implementation ctdVoucherViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        self.hasBackButton = YES;
        self.hasSignoutButton = YES;
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (IBAction)didRequestClicked:(id)sender{
}

- (IBAction)didReimbursementClicked:(id)sender{
    [self goToReimbursement];
}

-(void) goToReimbursement{
    ctdReimbursementViewController *ctdReimbursementPage = [[ctdReimbursementViewController alloc]initWithNibName:@"ctdReimbursementViewController" bundle:nil];
    [self.navigationController pushViewController:ctdReimbursementPage animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
